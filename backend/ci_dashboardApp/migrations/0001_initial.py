# Generated by Django 3.1.7 on 2021-03-08 23:30

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='CI',
            fields=[
                ('id', models.AutoField(auto_created=True,
                 primary_key=True, serialize=False, verbose_name='ID')),
                ('ci', models.CharField(max_length=60, unique=True)),
                ('link', models.URLField(max_length=128)),
                ('type', models.CharField(max_length=7)),
                ('access', models.CharField(max_length=7)),
                ('owner', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL,
                 related_name='owner', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Token',
            fields=[
                ('id', models.AutoField(auto_created=True,
                 primary_key=True, serialize=False, verbose_name='ID')),
                ('token', models.CharField(max_length=60)),
                ('ci', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE,
                 related_name='CI', to='ci_dashboardApp.ci')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE,
                 related_name='user', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Job',
            fields=[
                ('id', models.AutoField(auto_created=True,
                 primary_key=True, serialize=False, verbose_name='ID')),
                ('job', models.CharField(max_length=60)),
                ('path', models.CharField(max_length=60)),
                ('ci', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE,
                 related_name='jobs', to='ci_dashboardApp.ci')),
            ],
        ),
        migrations.AddConstraint(
            model_name='token',
            constraint=models.UniqueConstraint(
                fields=('ci', 'user'), name='oneToken_OneUser_OneCI'),
        ),
        migrations.AddConstraint(
            model_name='job',
            constraint=models.UniqueConstraint(
                fields=('job', 'ci', 'path'), name='oneCI_oneJob'),
        ),
        migrations.AddConstraint(
            model_name='ci',
            constraint=models.UniqueConstraint(
                fields=('ci', 'access', 'owner'), name='oneCi_oneType_oneOwner'),
        ),
    ]
