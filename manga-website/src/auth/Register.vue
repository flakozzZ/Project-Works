<template>
  <div class="login">
    <div class="login-panel">
      <div class="login-icon">
        <img src="../assets/icon.svg" alt="">
      </div>
      <div class="identifier-buttons">
        <button class="sign-button" :class="{'sign-button-active': isLoginRoute}" @click="navigateToSignIn">Вход
        </button>
        <button class="sign-button" :class="{'sign-button-active': !isLoginRoute}" @click="navigateToSignUp">
          Регистрация
        </button>
      </div>
      <div class="login-input">
        <input class="input" type="text" placeholder="Никнейм">
      </div>
      <div class="email-input">
        <input class="input" type="text" placeholder="e-mail">
      </div>

      <div class="password-input">
        <input class="input" type="password" placeholder="Пароль">
      </div>
      <div class="password-input">
        <input class="input" type="password" placeholder="Пароль">
      </div>


      <div class="registration-confirm">
        <button class="registration-button">Зарегестрироваться</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import {useRoute, useRouter} from "vue-router";

const router = useRouter();
const route = useRoute();

const isLoginRoute = route.path === '/auth/signin'

function navigateToSignIn() {
  if (!isLoginRoute) {
    router.push('/auth/signin')
  }
}

function navigateToSignUp() {
  if (isLoginRoute) {
    router.push('/auth/signup')
  }
}


</script>

<style scoped>
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  background: #F3F6FF;
}

.login-panel {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.login-icon {
  margin-bottom: 40px;
  font-family: 'Nunito', sans-serif;

}

.identifier-buttons {
  margin-bottom: 20px;
  width: 290px;
  display: flex;
  justify-content: space-between;
}

.sign-button {
  font-size: 12px;
  font-weight: 700;
  width: 130px;
  height: 36px;
  border-radius: 10px;
  background: transparent;
  font-family: 'Nunito', sans-serif;


}

.sign-button-active {
  background: #E2E8FA;
}


.input {
  width: 300px; /* Уменьшим ширину инпутов на 20px, чтобы учесть отступы для картинок */
  height: 40px;
  border: 1px solid #E2E8FA;
  border-radius: 5px;
  background-color: #E2E8FA;
  padding-left: 40px;
  margin-bottom: 10px;
  background-repeat: no-repeat;
  background-position: 10px center; /* Задаем отступ слева 10px для картинки */
  transition: background-color .1s linear;
}

.input:hover {
  background-color: #C8D2F2;
}

.login-input .input {
  background-image: url("../images/auth/login.svg");
}

.password-input .input {
  background-image: url("../images/auth/password.svg");
}

.email-input .input {
  background-image: url("../images/auth/email.svg");
}

.input::placeholder {
  font-family: 'Nunito', sans-serif;
  font-size: 14px;
  font-weight: 600;
  color: #1C274C80;
}

.registration-button {
  font-family: 'Nunito', sans-serif;
  font-size: 14px;
  width: 300px;
  height: 40px;
  background: #13AC75;
  color: #FFFFFF;
  font-weight: 900;
  border-radius: 10px;
  text-align: center;
  transition: background .1s linear;
}

.login-button:hover {
  background: #076EEE;
}

.login-links {
  display: flex;
  justify-content: space-between;
  width: 290px;
  margin-top: 10px;
}

.link {
  font-size: 12px;
  font-family: 'Nunito', sans-serif;
  font-weight: 700;
  color: #1C274C;
}


</style>