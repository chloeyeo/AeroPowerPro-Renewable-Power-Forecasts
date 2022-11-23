from django.shortcuts import render
from backend_db.forms import UserForm, UserProfileForm

# Create your views here.
def register(request):
    # tells whether registration was successful
    registered = False

    # if request is HTTP POST, we have to process form data
    if request.method == 'POST':
        # get raw form information
        user_form = UserForm(request.POST)
        profile_form = UserProfileForm(request.POST)

        # if two forms are valid, save user's form data to database
        if user_form.is_valid() and profile_form.is_valid():
            user = user_form.save()

            # hash password with set_password(), then update user object once hashed
            user.set_password(user.password)
            user.save()

            profile = profile_form.save(commit=False)
            profile.user = user

            # if user provided profile picture
            # get it from input form and put it in UserProfile model
            if 'picture' in request.FILES:
                profile.picture = request.FILES['picture']

            # save UserProfile model instance
            profile.save()

            registered = True
        else:
            print(user_form.errors, profile_form.errors)
    else:
        # if request not HTTP POST, then blank forms
        #  using two ModelForm instances, waiting for user input
        user_form = UserForm()
        profile_form = UserProfileForm()
    
    # render template with context
    return render(request, 'backend_db.register.html', context = {
        'user_form': user_form, 'profile_form': profile_form, 'registered': registered
    })
