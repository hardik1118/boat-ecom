# Generated by Django 3.2.4 on 2022-06-27 14:02

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('shop', '0003_auto_20220627_1648'),
    ]

    operations = [
        migrations.CreateModel(
            name='Order',
            fields=[
                ('order_id', models.AutoField(primary_key=True, serialize=False)),
                ('quantity', models.IntegerField()),
                ('order_date', models.DateField(auto_now_add=True)),
                ('status', models.CharField(choices=[('pending', 'pending'), ('rejected', 'rejected'), ('approved', 'approved'), ('delivered', 'delivered'), ('transport', 'transport')], max_length=10)),
                ('cust_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='shop.customer_info')),
                ('prod_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='shop.product')),
            ],
        ),
    ]
