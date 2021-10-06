from django.shortcuts import render, redirect
from .models import *
from userProfile.models import *
from comments.models import *
from django.contrib.auth.models import User
from django.contrib import messages
import math
# Create your views here.
def index(request):
    if request.user.is_authenticated:
        user = User.objects.get(username=request.user)
        makeEvent(request)
        currentUser = Profile.objects.get(user = user)
    else:
        if request.method == "POST":
            return redirect("UserProfile:signin")
        else:
            currentUser = None
    products = Product.objects.all()
    if 'search' in request.GET:
        if request.GET['search']:
            if Product.objects.filter(name__icontains=request.GET['search']).exists():
                products = Product.objects.filter(name__icontains=request.GET['search'])
            else:
                products = Product.objects.filter(name__icontains=request.GET['search'])
        else:
            products = Product.objects.all()
    else:
        products = Product.objects.all()
    context = {
        "products": products.order_by("-order_key"),
        "currentUser": currentUser,
    }
    return render(request, "index.html" , context)
def makeEvent(request):
    if request.user.is_authenticated:
        user = User.objects.get(username=request.user)
        userProfile = Profile.objects.get(user=user)
        if request.method == "POST":
            product = Product.objects.get(id=request.POST["id"])
            if "love" in request.POST:
                if product in userProfile.wishes.all():
                    userProfile.wishes.remove(product)
                elif not product in userProfile.wishes.all():
                    userProfile.wishes.add(product)
            elif "addToCart" in request.POST:
                if product in userProfile.cart.all():
                    userProfile.cart.remove(product)
                elif not product in userProfile.cart.all():
                    userProfile.cart.add(product)
            elif "buy" in request.POST:
                pass
            # elif "edit" in request.POST:
            #     return redirect("Products:editProduct",product.id)


    else:
        return redirect("UserProfile:signin")
def productDetails(request,productId):
    if request.user.is_authenticated:
        currentUser = Profile.objects.get(user = request.user)
    else:
        if request.method == "POST":
            return redirect("UserProfile:signin")
        else:
            currentUser = None
    makeEvent(request)
    product = Product.objects.get(id=productId)
    comments = Comment.objects.filter(product=product)
    # print(product.image.url)
    if product.sale:
        price = product.price * ( 100.0 - product.sale )
    else:
        price = 0
    available = product.quantity - product.sold
    if product.raters.count() != 0:
        rate = product.rate / product.raters.count()
    else:
        rate = 0
    context = {
        "product": product,
        "price": price,
        "available": available,
        "rate": rate,
        "currentUser": currentUser,
        "productDetail": True,
        "comments":comments
    }
    return render(request,"productDetails.html" , context)


def addProduct(request):
    if request.user.is_authenticated:
        currentUser = Profile.objects.get(user = request.user)
        Units = Unit.objects.all()
        Categories = Category.objects.all()
        context = {
            "currentUser": currentUser,
            "Units":Units,
            "Categories": Categories,
        }
        return render(request,"addProduct.html" , context)
    else:
        return redirect("UserProfile:signin")

def editProduct(request,productId):
    product=Product.objects.get(id = productId)
    if request.user.is_authenticated:
        if request.method == "POST":
            if "Save" in request.POST:
                p=request.POST
                if request.user == product.publisher:
                    product.name = str(p["productName"]).strip()
                    price = float(p["price"] or 0)
                    product.price = price
                    sale=float(p["sale"] or 0)
                    product.sale = sale
                    finalPrice = float(price - (price * (sale/100)))
                    product.finalPrice = finalPrice if finalPrice >= 0 else 0
                    product.unit = Unit.objects.get(id = p["unit"])
                    product.category= Category.objects.get(id = p['category'])
                    product.quantity = float(p["quantity"] or 0)
                    product.description = str(p["description"]).strip()
                    image = request.FILES.get('id_image') if request.FILES.get('id_image') else product.image
                    # if not product.image == image:
                    product.image = image
                    product.save()
            if "Delete" in request.POST:
                if request.user == product.publisher:
                    product.delete()
                    return redirect("Products:index")
            return redirect("Products:productDetails" ,productId)
                    
        if request.user == product.publisher:
            # print("\n\n\n\n\n\n\n\n\n\n\n" + product.name + "\n\n\n\n\n\n\n\n\n")
            context = {
                "product":product,
                "currentUser": Profile.objects.get(user=request.user),
                "Units":Unit.objects.all(),
                "Categories": Category.objects.all(),
            }
            return render(request,"editProduct.html",context)
        else:
            return redirect("Products:index")

def cart(request):
    if request.user.is_authenticated:
        user = User.objects.get(username=request.user)
        makeEvent(request)
        currentUser = Profile.objects.get(user = user)
        products = currentUser.cart.all
        context = {
            "products":products,
            "currentUser": currentUser,
        }
        return render(request,"index.html" , context)
    else:
        return redirect("UserProfile:signin")
    
def wishes(request):
    if request.user.is_authenticated:
        user = User.objects.get(username=request.user)
        makeEvent(request)
        currentUser = Profile.objects.get(user = user)
        products = currentUser.wishes.all
        context = {
            "products":products,
            "currentUser": currentUser,
        }
        return render(request,"index.html" , context)
    else:
        return redirect("UserProfile:signin")

def myProducts(request):
    if request.user.is_authenticated:
        user = User.objects.get(username=request.user)
        currentUser = Profile.objects.get(user = user)
        products = Product.objects.filter(publisher = user)
        context = {
            "products": products.order_by("-order_key"),
            "currentUser": currentUser,
        }
        return render(request,"index.html" , context)
    else:
        return redirect("UserProfile:signin")

def add(request):
    if request.user.is_authenticated:
        if request.method == "POST":
            p=request.POST
            productName = str(p["productName"]).strip()
            price = float(p["price"] or 0)
            sale=float(p["sale"] or 0)
            finalPrice = float(price - (price * (sale/100)))
            finalPrice = finalPrice if finalPrice >= 0 else 0
            unit = Unit.objects.get(id = p["unit"])
            category= Category.objects.get(id = p['category'])
            quantity = float(p["quantity"] or 0)
            description = str(p["description"]).strip()
            image = request.FILES.get('id_image') or 'Products/default.jpg'
            pro = Product(
                order_key=(int(Product.objects.all().count()) + -2147483),
                name=productName,
                price=price,
                finalPrice=finalPrice,
                quantity=quantity,
                sale=sale,
                unit=unit,
                description=description,
                publisher=Profile.objects.get(user=request.user),
                category=category,
                image=image
                # isPremium=False
                )
            if quantity != 0 and productName != "":
                pro.save()
        return redirect("Products:index")
    else:
        return redirect("UserProfile:signin")

# def action(request,productId):
#     if request.user.is_authenticated:
#         if request.method=='POST':
#             p = request.POST
#             product=Product.objects.get(id = productId)
#             if 'buy' in p:
#                 pass
#             elif 'addToCart' in p:
#                 if product in userProfile.cart.all():
#                     userProfile.cart.remove(product)
#                 elif not product in userProfile.cart.all():
#                     userProfile.cart.add(product)
#             elif 'love' in p:
#                     if product in userProfile.wishes.all():
#                         userProfile.wishes.remove(product)
#                     elif not product in userProfile.wishes.all():
#                         userProfile.wishes.add(product)
#         return redirect('products:productDetails', productId)
#     else:
#         return redirect("UserProfile:signin")
