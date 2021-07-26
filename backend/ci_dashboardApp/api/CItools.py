import requests
import json

passedStatuses = (
    'passed',           # TravisCI
    'SUCCESS',          # Jenkins
    'success',          # CircleCI
)

failedStatuses = (
    'failed',           # TravisCI / CircleCI
    'errored',          # TravisCI
    'FAILURE',          # Jenkins
    'failing',          # CircleCI
)

abortedStatuses = (
    'canceled',         # TravisCI / CircleCI
    'ABORTED',          # Jenkins
)

unstableStatuses = (
    'UNSTABLE',         # Jenkins
)

runStatuses = (
    'started',          # TravisCI
    'created',          # TravisCI
    'running',          # CircleCI
    None,               # Jenkins
)


def mapStates(state):
    if (state in passedStatuses):
        mappedState = 'SUCCESS'
    elif (state in abortedStatuses):
        mappedState = 'ABORTED'
    elif (state in failedStatuses):
        mappedState = 'FAILURE'
    elif (state in unstableStatuses):
        mappedState = 'UNSTABLE'
    elif (state in runStatuses):
        mappedState = 'RUNNING'
    else:
        # Cases:
        #   Jenkins / TravisCI / CircleCI:
        #       - not available
        #       - no information
        #   Jenkins:
        #       - NOT_BUILT
        #   CircleCI (https://circleci.com/docs/2.0/workflows/#states):
        #       - NOT RUN: Workflow was never started
        #       - ON HOLD: A job in the workflow is waiting for approval
        #       - NEEDS SETUP: A workflow stanza is not included or is incorrect in the config.yml file for this project
        mappedState = 'UNKNOWN'
    return mappedState


def getTravisJobStatus(url, token):
    response = requests.get(str(url),
                            headers={'User-Agent': 'CI-Dashboard',
                                     'Travis-API-Version': '3',
                                     'Authorization': 'token ' + str(token)},
                            verify=True,
                            timeout=10)
    jobStatus = json.loads(response.text)
    return jobStatus


def getCircleJobStatus(url):
    response = requests.get(url,
                            verify=True,
                            timeout=10)
    jobStatus = json.loads(response.text)
    return jobStatus


def getJenkinsJobStatus(url):
    response = requests.get(url,
                            headers={'Accept': 'application/json'},
                            verify=False,
                            timeout=10)
    jobStatus = json.loads(response.text)
    return jobStatus


def processCI(job, token):
    try:
        if job.ci.type == "TRAVIS":
            jobUrl = f"https://travis-ci.com/{job.path}/{job}/builds/"
            apiurl = f"https://api.travis-ci.com/repo/{job.path}%2F{job}/builds?limit=1&branch.name=master"
            jobStatus = getTravisJobStatus(apiurl, token)["builds"][0]
            buildResult = mapStates(jobStatus['state'])
            last_build_number = jobStatus['number']
            buildUrl = f"{jobUrl}/{jobStatus['id']}"
        elif job.ci.type == "JENKINS":
            jobUrl = f"{job.ci.link}/{job.path}/{job}"
            apiurl = f"{jobUrl}/lastBuild/api/json?tree=result,number,url"
            jobStatus = getJenkinsJobStatus(apiurl)
            buildResult = mapStates(jobStatus['result'])
            last_build_number = jobStatus['number']
            buildUrl = jobStatus['url']
        elif job.ci.type == "CIRCLE":
            jobUrl = f"https://app.circleci.com/pipelines/{job.path}/{job}"
            apiurl = f"https://circleci.com/api/v1.1/project/{job.path}/{job}/tree/master?limit=2&shallow=true"
            jobStatus = getCircleJobStatus(apiurl)
            buildResult = mapStates(jobStatus[0]['outcome'])
            last_build_number = jobStatus[0]['build_num']
            buildUrl = jobStatus[0]['build_url']

        if buildResult == 'RUNNING':
            if job.ci.type == "TRAVIS":
                previousBuildResult = mapStates(jobStatus['previous_state'])
            elif job.ci.type == "JENKINS":
                previousApiUrl = f"{jobUrl}/{last_build_number-1}/api/json?tree=result"
                previousJobStatus = getJenkinsJobStatus(previousApiUrl)
                previousBuildResult = mapStates(previousJobStatus['result'])
            elif job.ci.type == "CIRCLE":
                previousBuildResult = mapStates(jobStatus[1]['outcome'])

            if previousBuildResult == 'FAILURE':
                buildResult = 'FAILURE/RUNNING'
            elif previousBuildResult == 'UNSTABLE':
                buildResult = 'UNSTABLE/RUNNING'
            elif previousBuildResult == 'SUCCESS':
                buildResult = 'SUCCESS/RUNNING'
            elif previousBuildResult == 'ABORTED':
                buildResult = 'ABORTED/RUNNING'

    except Exception as e:
        print(e)
        return {'name': str(job), 'buildNumber': 'UNKNOWN', 'buildStatus': 'UNKNOWN', 'buildUrl': 'UNKNOWN', 'jobUrl': jobUrl}
    return {'name': str(job), 'buildNumber': str(last_build_number), 'buildStatus': buildResult, 'buildUrl': buildUrl, 'jobUrl': jobUrl}
