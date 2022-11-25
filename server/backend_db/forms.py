from django import forms
from django.contrib.auth.models import User
from models import UserProfile, ActualProduceElectricity


class UserForm(forms.ModelForm):
    password = forms.CharField(widget=forms.PasswordInput())
    class Meta:
        model = User
        fields = ('username', 'email', 'password',)


class UserProfileForm(forms.ModelForm):
    class Meta:
        model = UserProfile
        fields = ('website', 'picture',)


class ElexonForm(forms.ModelForm):
    class Meta:
        model = ActualProduceElectricity
        fields = ('time_series_id', 'registed_resource_eic_code', 'bm_unit_id', 'ngc_bm_unit_id', 'psr_type', 'market_generation_unit_eic_code',
                  'market_generation_bmu_id', 'market_generation_ngc_bmu_id', 'settlement_date', 'period', 'quantity')
