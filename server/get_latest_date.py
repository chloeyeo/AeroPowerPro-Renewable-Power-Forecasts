from django.core.exceptions import ObjectDoesNotExist
from dateutil.relativedelta import relativedelta

def get_latest_date(model, end_time, table_variable_name):
    try:
        return model.objects.latest(table_variable_name)
    except ObjectDoesNotExist:
         return end_time - relativedelta (years=2) # Database is empty, pull 2 years prior
