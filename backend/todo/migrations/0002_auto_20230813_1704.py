# Generated by Django 3.2.15 on 2023-08-13 11:19

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('todo', '0001_initial'),
    ]

    operations = [
        migrations.RemoveIndex(
            model_name='task',
            name='todo_task_created_b10b54_idx',
        ),
        migrations.RemoveField(
            model_name='task',
            name='created_by',
        ),
        migrations.AddField(
            model_name='task',
            name='user',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
    ]
