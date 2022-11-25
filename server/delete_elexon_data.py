import os
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'server.settings')

import django
django.setup()
from backend_db.models import ActualProduceElectricity


if __name__ == '__main__':
    delete_flag = input("THIS WILL DELETE ALL DATA IN OUR NOAA DATABASE, PROCEED? [YES/NO]: ")
    if delete_flag.lower() in ['yes', 'y']:
        delete_flag = input("THIS IS NOT REVERSIBLE, ARE YOU SURE? [YES/NO]: ")
        if delete_flag.lower() in ['yes', 'y']:
            ActualProduceElectricity.objects.all().delete()
            print("All data has been deleted :(")
        else:
            print("Aborting")
    else:
        print("Aborting")
