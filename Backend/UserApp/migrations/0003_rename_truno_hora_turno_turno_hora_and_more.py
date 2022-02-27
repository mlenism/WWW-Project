# Generated by Django 4.0.2 on 2022-02-26 23:25

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('UserApp', '0002_alter_sede_sede_nombre_alter_usuario_sede_codigo'),
    ]

    operations = [
        migrations.RenameField(
            model_name='turno',
            old_name='truno_hora',
            new_name='turno_hora',
        ),
        migrations.AlterField(
            model_name='caja',
            name='caja_codigo',
            field=models.BigAutoField(primary_key=True, serialize=False),
        ),
        migrations.AlterField(
            model_name='caja',
            name='sede_codigo',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.DO_NOTHING, to='UserApp.sede', to_field='sede_nombre'),
        ),
        migrations.AlterField(
            model_name='caja',
            name='servicio_codigo',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.DO_NOTHING, to='UserApp.servicio', to_field='servicio_nombre'),
        ),
        migrations.AlterField(
            model_name='estado',
            name='estado_nombre',
            field=models.CharField(max_length=50, unique=True),
        ),
        migrations.AlterField(
            model_name='persona',
            name='persona_documento',
            field=models.CharField(max_length=20, unique=True),
        ),
        migrations.AlterField(
            model_name='servicio',
            name='servicio_prioridad',
            field=models.FloatField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='turno',
            name='estado_codigo',
            field=models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='UserApp.estado', to_field='estado_nombre'),
        ),
    ]