from django.shortcuts import render
from backend_db.forms import UserForm, UserProfileForm
import {Login} from '../../src/pages/login'

# Create your views here.
@login_required
def register(request):
    try:
        # tells whether registration was successful
        registered = False
        
        data = {'registered': True, 'password': document.getElementById("exampleInputPassword1").value,
        'email': document.getElementById("exampleInputPassword1").value}

        return JsonResponse(data)
    except:
        data = {'registered': False, 'password':'', 'email': ''}
        return JsonResponse(data)
