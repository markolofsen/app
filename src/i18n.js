import i18n from 'i18next';
import { reactI18nextModule } from 'react-i18next';


import Expo from 'expo';
import {AsyncStorage} from 'react-native';



// creating a language detection plugin using expo
// http://i18next.com/docs/ownplugin/#languagedetector
const languageDetector = {
  type: 'languageDetector',
  async: true, // async detection
  detect: (cb) => {

    let applyLng = 'en'
    AsyncStorage.getItem('userLang', (error, result) => {

      Expo.Util.getCurrentLocaleAsync().then(expoLng => {
        if(!result) applyLng = expoLng
        if(result) applyLng = result

        if(['en','ru'].includes(applyLng)) {
          AsyncStorage.setItem('userLang', applyLng).then(resp => {
            cb(applyLng)
          })
        } else {
          cb('en')
        }

      })
    })
  },
  init: () => {},
  cacheUserLanguage: () => {}
}



i18n
  .use(languageDetector)
  .use(reactI18nextModule)
  .init({
    fallbackLng: 'en',

    resources: {
      en: {
        home: {
          title: 'Welcome',
          introduction: 'This text comes from i18next and is provided in english.'
        },
        postfixes: {
          review_one: 'review',
          review_three: 'reviews',
          review_ten: 'reviews',
        },
        page2: {
          title: 'Page 2',
          introduction: 'This text on page two.'
        },
        common: {
          "Order": "Order",
          "Account": "Account",
          "History": "History",
          "Support": "Support",

          currentLanguage: 'The current language is "{{lng}}"',
          actions: {
            toggleToGerman: 'Deutsch',
            toggleToEnglish: 'English',
            goToPage2: 'Open page 2'
          },
          infoText: "<0><0>Eins </O><1>Zwei </1><2>Drei </2><3>Vier </3><4>Fünf</4></O>"
        }
      },
      ru: {
        home: {
          title: 'Welcome',
          introduction: 'This text comes from i18next and is provided in english.'
        },
        postfixes: {
          review_one: 'отзыв',
          review_three: 'отзыва',
          review_ten: 'отзывов',
        },
        page2: {
          title: 'Page 2',
          introduction: 'This text on page two.'
        },
        common: {
          "Order": "Заказ",
          "Account": "Аккаунт",
          "History": "История",
          "Support": "Помощь",

          currentLanguage: 'The current language is "{{lng}}"',
          actions: {
            toggleToGerman: 'Deutsch',
            toggleToEnglish: 'English',
            goToPage2: 'Open page 2'
          },
          infoText: "<0><0>Eins </O><1>Zwei </1><2>Drei </2><3>Vier </3><4>Fünf</4></O>"
        }
      },
      de: {
        home: {
          title: 'Willkommen',
          introduction: 'Dieser Text ist von i18next und ist in deutsch.'
        },
        page2: {
          title: 'Seite 2',
          introduction: 'Text auf Seite 2'
        },
        common: {
          currentLanguage: 'Die Sprache ist auf "{{lng}}" gesetzt',
          actions: {
            toggleToGerman: 'Deutsch',
            toggleToEnglish: 'English',
            goToPage2: 'Öffne Seite 2'
          }
        }
      }
    },

    // have a common namespace used around the full app
    ns: ['common'],
    defaultNS: 'common',

    debug: true,

    // cache: {
    //   enabled: true
    // },

    interpolation: {
      escapeValue: false, // not needed for react as it does escape per default to prevent xss!
    }
  });


export default i18n;
