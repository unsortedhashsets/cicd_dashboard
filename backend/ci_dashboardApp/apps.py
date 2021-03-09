from django.apps import AppConfig


class CIdashboardAppConfig(AppConfig):
    name = 'ci_dashboardApp'

    def ready(self):
        import ci_dashboardApp.signals