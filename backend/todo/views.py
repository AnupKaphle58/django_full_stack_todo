from rest_framework.decorators import api_view
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.response import Response
from rest_framework import status
from .serializers import TaskSerializer, TaskRegisterSerializer, UserSerializer, UserRegisterSerializer
from .models import Task, User
import jwt, datetime
from django.contrib.auth import get_user_model
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from rest_framework.views import APIView


# Create your views here.
random_key = "FGlvsmaH2IARo0+UzFbJFWj82dcrNgu0v03U/ebGHAGxBC8AvhynsVWVuE3g+0KoGrcRVXFp/DP/iI+fSw76sg=="

class ApiOverView(APIView):

    def get(self, request):
        api_urls = {
            'List': '/task-list/',
            'Detail View': '/task-detail/<str:pk>/',
            'Create': '/task-create/',
            'Update': '/task-update/<str:pk>/',
            'Delete': '/task-delete/<str:pk>/',
        }

        return Response(api_urls)

class UserLoginView(APIView):

    @method_decorator(csrf_exempt)
    def post(self, request):
        username = request.data['username']
        password = request.data['password']
        response = Response()

        user = get_user_model().objects.filter(username=username).first()

        if user is None:
            raise AuthenticationFailed('User not found!')

        if not user.check_password(password):
            raise AuthenticationFailed('Incorrect Password!!')

        payload = {
            'username': user.username,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(days=2),
            'iat': datetime.datetime.utcnow()
        }

        token = jwt.encode(payload, random_key, algorithm='HS256')

        response.set_cookie(key='jwt', value=token, httponly=True)

        response.data = {
            'jwt': token,
            "message": "You are logged in successfully"
        }

        return response

class UserRegisterView(APIView):

    def post(self, request):
        js_data = request.data
        username = request.data['username']
        password = request.data['password']
        confirm_password = request.data['confirmPassword']
        serializer = UserRegisterSerializer(data=request.data)
        response = Response()

        user = get_user_model().objects.filter(username=username).first()

        if user:
            raise AuthenticationFailed('Username already exists!')
        
        if(password != confirm_password):
            print(password, confirm_password)
            raise AuthenticationFailed('Password must be same')

        if serializer.is_valid():
            serializer.save()

        payload = {
            'username': user,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(days=2),
            'iat': datetime.datetime.utcnow()
        }

        token = jwt.encode(payload, random_key , algorithm='HS256')

        response.set_cookie(key='jwt', value=token, httponly=True)

        response.data = {
            'jwt': token,
            "message": "You are now registered"
        }

        return response
    
class UserLogoutView(APIView):

    def post(self, request):
        response = Response()
        response.delete_cookie('jwt')
        response.data = {
            'message': 'success'
        }

        return response

class GetUserView(APIView):

    def get(self, request):
        token = request.COOKIES.get('jwt')

        if not token:
            raise AuthenticationFailed('You are not logged in! Or Token Expired Log in again.')

        try:
            payload = jwt.decode(token, random_key , algorithms=['HS256'])

        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('En error!')

        user = get_user_model().objects.filter(username=payload['username']).first()
        if(user):
            serializer = UserSerializer(user)

            return Response(serializer.data)
        
        else:
            user = None
            return Response(user)

class TaskListView(APIView):

    def get(self, request):
        token = request.COOKIES.get('jwt')

        if not token:
            raise AuthenticationFailed('You are not logged in! Or Token Expired Log in again.')

        try:
            payload = jwt.decode(token, random_key , algorithms=['HS256'])

        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('En error!')
        
        user = get_user_model().objects.filter(username=payload['username']).first()
        serializer = UserSerializer(user)
        
        tasks = Task.objects.all().filter(user=serializer.data["id"])
        serializer = TaskSerializer(tasks, many=True)
        return Response(serializer.data)

class TaskDetailView(APIView):

    def get(self, request, pk):
        token = request.COOKIES.get('jwt')

        if not token:
            raise AuthenticationFailed('You are not logged in! Or Token Expired Log in again.')

        try:
            payload = jwt.decode(token, random_key , algorithms=['HS256'])

        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('En error!')
        
        user = User.objects.get(username=payload['username'])
        
        tasks = Task.objects.get(id=pk,user=user.id)
        print(tasks)
        serializer = TaskSerializer(tasks, many=False)
        return Response(serializer.data)


class TaskCreateView(APIView):

    def post(self, request):
        token = request.COOKIES.get('jwt')

        if not token:
            raise AuthenticationFailed('You are not logged in! Or Token Expired Log in again.')

        try:
            payload = jwt.decode(token, random_key , algorithms=['HS256'])

        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('En error!')
        
        user = User.objects.get(username=payload['username'])
        serializer = TaskRegisterSerializer(data=request.data, context={'user': user})

        if serializer.is_valid():
            serializer.save()
            print(serializer.save())

        return Response({'msg': 'Task has been created' ,'created_task': serializer.data})


class TaskUpdateView(APIView):

    def post(self, request, pk):
        token = request.COOKIES.get('jwt')
        payload = jwt.decode(token, random_key, algorithms=['HS256'])

        if not token:
            raise AuthenticationFailed('You are not logged in! Or Token Expired Log in again.')

        try:
            payload = jwt.decode(token, random_key , algorithms=['HS256'])

        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('En error!')

        user = User.objects.get(username=payload['username'])

        try:
            task = Task.objects.get(id=pk,user=user.id)
            request.data['id']= pk
            request.data['user'] = user.id
            serializer = TaskSerializer(instance=task, data=request.data)
            

            if serializer.is_valid():
                serializer.save()

            return Response({'msg': 'Task has been updated' ,'updated_task': serializer.data})

        except Exception as err:
            print(err)
            return Response({'msg': 'You do not have access to this item!'}, status=status.HTTP_403_FORBIDDEN)



class TaskDeleteView(APIView):

    def delete(self, request, pk):
        token = request.COOKIES.get('jwt')
        payload = jwt.decode(token, random_key , algorithms=['HS256'])

        user = User.objects.get(username=payload['username'])

        try:
            task = Task.objects.get(id=pk,user=user.id)
            task.delete()
            return Response({'msg': 'Item deleted successfully'}, status=status.HTTP_200_OK)

        except Exception as err:
            return Response({'msg': 'You do not have access to this item!'}, status=status.HTTP_403_FORBIDDEN)

