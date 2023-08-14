from django.urls import path, include
from . import views

urlpatterns = [
	path('', views.ApiOverView.as_view(), name="api-overview"),

    path('user-login/', views.UserLoginView.as_view(), name="user-register"),
	path('user-register/', views.UserRegisterView.as_view(), name="user-login"),
	path('current-user/', views.GetUserView.as_view(), name='current-user'),
	path('user-logout/', views.UserLogoutView.as_view()),

    path('task-list/', views.TaskListView.as_view(), name="task-list"),
    path('task-detail/<str:pk>/', views.TaskDetailView.as_view(), name="task-detail"),
	path('task-create/', views.TaskCreateView.as_view(), name="task-create"),
    path('task-update/<str:pk>/', views.TaskUpdateView.as_view(), name="task-update"),
	path('task-delete/<str:pk>/', views.TaskDeleteView.as_view(), name="task-delete"),


]

# https://github.com/Vitaee/DjangoRestAPI/blob/main/api/views.py