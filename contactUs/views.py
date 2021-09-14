from django.shortcuts import render, redirect
from .models import *
# from django.core.mail import BadHeaderError, send_mail
# from django.http import HttpResponse, HttpResponseRedirect
# from django.core.mail import send_mail

# Create your views here.
def contactUs(request):
    if request.user.is_authenticated:
        if request.method == 'POST':
            name = request.POST['name']
            email = request.POST['email']
            phoneNumber = request.POST['phoneNumber']
            subject = request.POST['subject']
            message = request.POST['message']
            Email = Emails(
                user=request.user,
                name=name,
                email=email,
                phoneNumber=phoneNumber,
                subject=subject,
                message=message
            )
            Email.save()
            return redirect("Products:index")
        else:
            return render(request, 'contactUs.html')
    else:
        return redirect("UserProfile:signUp")



# def send_email(request):
#     subject = request.POST.get('subject', '')
#     message = request.POST.get('message', '')
#     from_email = request.POST.get('from_email', '')
#     if subject and message and from_email:
#         try:
#             send_mail(subject, message, from_email, ['admin@example.com'])
#         except BadHeaderError:
#             return HttpResponse('Invalid header found.')
#         return HttpResponseRedirect('/contact/thanks/')
#     else:
#         # In reality we'd use a form class
#         # to get proper validation errors.
#         return HttpResponse('Make sure all fields are entered and valid.')