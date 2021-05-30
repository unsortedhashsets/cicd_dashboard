import requests
import json

def mapStates(state):
    if (state == 'passed' or str(state).lower().startswith('blue')):
        mappedState = 'SUCCESS'
    elif (state == 'canceled' or str(state).lower().startswith('aborted')):
        mappedState = 'ABORTED'
    elif (state == 'failed' or str(state).lower().startswith('red')):
        mappedState = 'FAILURE'
    elif (state == 'errored'):
        mappedState = 'FAILURE'
    elif (str(state).lower().startswith('yellow')):
        mappedState = 'UNSTABLE'
    else:
        mappedState = 'UNKNOWN'
    return mappedState

def getTravisJobStatus(url, token):
    response = requests.get(str(url), headers={'User-Agent': 'CI-Dashboard',
                                               'Travis-API-Version': '3',
                                               'Authorization': 'token ' + str(token)},
                                              verify=False,
                                              timeout=5)
    jobStatus = json.loads(response.text)
    return jobStatus

def getJenkinsJobStatus(url):
    response = requests.get(url, headers={'Accept': 'application/json'},
                                         verify=False,
                                         timeout=5)
    jobStatus = json.loads(response.text)
    return jobStatus

def processCI(job, token):
    try:
        if job.ci.type == "TRAVIS":
            jobUrl = f"https://travis-ci.com/{job.path}/{job}/builds/"
            apiurl = f"https://api.travis-ci.com/repo/{job.path}%2F{job}/builds?limit=1"
            jobStatus = getTravisJobStatus(apiurl, token)
            jobStatus = jobStatus["builds"][0]
            buildId = jobStatus['id']
            buildResult = mapStates(jobStatus['state'])
            last_build_number = jobStatus['number']
            buildUrl = f"{jobUrl}/{buildId}"
        elif job.ci.type == "JENKINS":
            jobUrl = f"{job.ci.link}/{job.path}/{job}"
            apiurl = f"{jobUrl}/api/json"
            jobStatus = getJenkinsJobStatus(apiurl)
            buildResult = mapStates(jobStatus['color'])
            last_build_number = jobStatus['lastCompletedBuild']['number']
            buildUrl = jobStatus['lastCompletedBuild']['url']
    except Exception as e:
        print(e)
        return { 'name': str(job), 'buildNumber': 'UNKNOWN', 'buildStatus': 'UNKNOWN', 'buildUrl': 'UNKNOWN', 'jobUrl': jobUrl}
    return { 'name': str(job), 'buildNumber': str(last_build_number), 'buildStatus': buildResult, 'buildUrl': buildUrl, 'jobUrl': jobUrl}