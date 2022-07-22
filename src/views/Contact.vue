<template>
  <base-poster
    v-bind="{
      alt: moviePoster.title,
      src: moviePoster.backdrop_lg,
    }"
    height="200px"
    position="center"
  >
    <base-heading type="h1">{{ dictionary.contactUs }}</base-heading>
  </base-poster>

  <base-section class="contact-page__section">
    <base-wrapper class="contact-page__wrapper">
      <form class="contact-page__form" @submit.prevent="onFormSubmit()">
        <div class="contact-page__form-group">
          <base-input
            v-model="formValues.firstName"
            v-bind="{ invalid: v$.firstName.$error }"
            clearable
            placeholder="Required"
            type="text"
          >
            {{ dictionary.firstName }}
          </base-input>

          <base-input
            v-model="formValues.lastName"
            v-bind="{ invalid: v$.lastName.$error }"
            clearable
            placeholder="Required"
            type="text"
          >
            {{ dictionary.lastName }}
          </base-input>
        </div>

        <div class="contact-page__form-group">
          <base-input
            v-model="formValues.phoneNumber"
            v-bind="{ invalid: v$.phoneNumber.$error }"
            clearable
            placeholder="Required"
            type="tel"
          >
            {{ dictionary.phone }}
          </base-input>

          <base-input
            v-model="formValues.email"
            v-bind="{ invalid: v$.email.$error }"
            clearable
            placeholder="Required"
            type="email"
          >
            {{ dictionary.email }}
          </base-input>
        </div>

        <base-select
          v-model="formValues.subject"
          v-bind="{
            invalid: v$.subject.$error,
            items: dictionary.contactFormSelectValues,
          }"
          placeholder="Required"
        >
          {{ dictionary.subject }}
        </base-select>

        <base-textarea
          v-model="formValues.message"
          v-bind="{ invalid: v$.message.$error }"
          placeholder="Required"
          autogrow
        >
          {{ dictionary.message }}
        </base-textarea>

        <base-checkbox
          v-model="formValues.consent"
          v-bind="{
            invalid: v$.consent.$error,
            value: dictionary.consent,
          }"
        >
          {{ dictionary.consent }}*
        </base-checkbox>

        <base-button class="contact-page__form-button" type="submit">
          {{ dictionary.submit }}
        </base-button>
      </form>
    </base-wrapper>
  </base-section>
</template>

<script lang="ts" setup>
import { computed, reactive } from 'vue';
import { useStore, Getter, Action } from '../store';
import { useVuelidate } from '@vuelidate/core';
import { email, required } from '@vuelidate/validators';
import { randomNumber } from '../helpers/use-random-number';
import { dictionary } from '../config/dictionary.config';

const store = useStore();

const moviesList = computed(() => store.getters[Getter.GET_MOVIES_LIST]);

const moviePoster = computed(() => {
  return moviesList.value[randomNumber(0, moviesList.value.length - 1)];
});

const initialState = {
  firstName: '',
  lastName: '',
  phoneNumber: '',
  email: '',
  subject: '',
  message: '',
  consent: '',
};

const formValues = reactive({ ...initialState });

const formValidations = computed(() => ({
  firstName: { required },
  lastName: { required },
  phoneNumber: { required },
  email: { email, required },
  subject: { required },
  message: { required },
  consent: { required },
}));

const v$ = useVuelidate(formValidations, formValues, { $lazy: true });

function onFormSubmit() {
  v$.value.$validate().then((isValid) => {
    if (isValid) {
      store.dispatch(Action.SHOW_ALERT, {
        message: dictionary.formHasBeenSent,
        type: 'success',
      });

      resetForm();
    } else {
      store.dispatch(Action.SHOW_ALERT, {
        message: dictionary.formRequiredFields,
        type: 'error',
      });
    }
  });
}

function resetForm() {
  v$.value.$reset();
  Object.assign(formValues, initialState);
}
</script>

<style lang="scss">
.contact-page {
  &__wrapper {
    max-width: 900px;
  }

  &__form,
  &__form-group {
    display: grid;
    gap: 2rem;
  }

  &__form {
    margin-top: 1.875em;

    &-button {
      margin-inline: auto;
      font-size: $fsize-rg;
      width: 120px;
    }
  }
}

@media (min-width: 768px) {
  .contact-page {
    &__form {
      &-group {
        grid-template-columns: repeat(2, 1fr);
      }
    }
  }
}
</style>
