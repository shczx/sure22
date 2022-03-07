from django.db import models


class Note(models.Model):
    input = models.CharField(max_length=200)
    startOffset = models.IntegerField()
    endOffset = models.IntegerField()
    start = models.CharField(max_length=50)
    end = models.CharField(max_length=50)
