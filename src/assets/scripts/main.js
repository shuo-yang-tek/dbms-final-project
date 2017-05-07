const baseUrl = window.location.protocol + '//' + window.location.host;

function fillDigi(digi, len = 2) {
   digi = digi.toString();
   const re = len - digi.length;
   if( re <= 0 )
      return digi;
   return '0'.repeat(re) + digi;
}

function setTimeStr(article) {
   const dt = new Date(article.timestamp);
   article.timeStr = 
      dt.getFullYear() + '/' + (dt.getMonth() + 1) + '/' + dt.getDate() + ' ' +
      fillDigi(dt.getHours()) + ':' + 
      fillDigi(dt.getMinutes()) + ':' + 
      fillDigi(dt.getSeconds());
}

const articlesApp = new window.Vue({
   el: '#articles',
   data: {
      articles: []
   },
   methods: {
      edit: function(id) {
         showEditArticle(id);
      },
      remove: async function(id) {
         loadingApp.show = true;

         await fetch(baseUrl + '/articles/' + id, {
            method: 'delete'
         });
         await getArticles();

         loadingApp.show = false;
      }
   }
});

const loadingApp = new window.Vue({
   el: '#loading',
   data: {
      show: false
   }
});

const editArticleApp = new window.Vue({
   el: '#edit-article-app',
   data: {
      id: -1,
      title: '',
      author: '',
      context: '',
      submitText: '',
      alertContext: ''
   },
   methods: {
      submit: async function() {
         loadingApp.show = true;

         let method, url = '/articles';

         if( this.id < 0 )
            method = 'post';
         else {
            method = 'put';
            url += '/' + this.id;
         }

         const body = JSON.stringify({
            title: this.title,
            author: this.author,
            context: this.context
         });
         const res = await fetch(url, {
            method,
            headers: {
               'Content-Type': 'application/json',
            },
            body
         });

         const data = await res.json();

         if( !res.ok ) {
            this.alertContext = data.message;
         } else {
            window.$('#edit-article-modal').modal('hide');
            await getArticles();
         }

         loadingApp.show = false;
      }
   }
});

async function getArticles() {
   loadingApp.show = true;

   const res = await fetch(baseUrl + '/articles');
   if( !res.ok )
      return;

   articlesApp.articles = await res.json();

   for(const article of articlesApp.articles)
      setTimeStr(article);

   loadingApp.show = false;
}

async function showEditArticle(id) {
   editArticleApp.id = id;
   if(id < 0) {
      editArticleApp.title = '';
      editArticleApp.author = '';
      editArticleApp.context = '';
      editArticleApp.submitText = '新增文章';
      editArticleApp.alertContext = '';
   } else {
      loadingApp.show = true;
      
      const res = await fetch(baseUrl + '/articles/' + id);
      if( !res.ok )
         return;

      const data = await res.json();
      editArticleApp.title = data.title;
      editArticleApp.author = data.author;
      editArticleApp.context = data.context;
      editArticleApp.submitText = '確認編輯';
      editArticleApp.alertContext = '';

      loadingApp.show = false;
   }

   window.$('#edit-article-modal').modal('show');
}

getArticles();
