# Generated by Django 4.0.3 on 2022-03-07 03:22

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('highlighter', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='note',
            old_name='end_container',
            new_name='end',
        ),
        migrations.RenameField(
            model_name='note',
            old_name='end_offset',
            new_name='endOffset',
        ),
        migrations.RenameField(
            model_name='note',
            old_name='user_input',
            new_name='input',
        ),
        migrations.RenameField(
            model_name='note',
            old_name='start_container',
            new_name='start',
        ),
        migrations.RenameField(
            model_name='note',
            old_name='start_offset',
            new_name='startOffset',
        ),
    ]
