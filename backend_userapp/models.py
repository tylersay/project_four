from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils import timezone
# Create your models here.

class CustomUser(AbstractUser):
    
    def __str__(self):
        return self.email

class Ticker(models.Model):
  user = models.ForeignKey(CustomUser, on_delete = models.CASCADE)
  tickers_text= models.CharField(max_length=10)
  shares_holding = models.IntegerField(default = 1)
  bought_date = models.DateTimeField('Date Bought', default=timezone.now())
  def __str__(self):
      return self.tickers_text