import { ref, set, get, update, remove, child } from "firebase/database";
import { database } from './firebase.js';

class ArticleDAO {
    constructor() {
        this.dbRef = ref(database);
    }

    // حفظ مقال جديد
    async saveArticle(article) {
        const articleRef = ref(database, `articles/article${article.id}`);
        try {
            await set(articleRef, article);
            console.log('Article saved successfully');
        } catch (error) {
            console.error('Error saving article:', error);
        }
    }

    // تحديث مقال
    async updateArticle(id, updates) {
        const articleRef = ref(database, `articles/article${id}`);
        try {
            await update(articleRef, updates);
            console.log('Article updated successfully');
        } catch (error) {
            console.error('Error updating article:', error);
        }
    }

    // جلب مقال بناءً على ID
    async getArticleID(id) {
        const articleRef = ref(database, `articles/article${id}`);
        try {
            const snapshot = await get(articleRef);
            if (snapshot.exists()) {
                return snapshot.val();
            } else {
                console.log('No article found');
            }
        } catch (error) {
            console.error('Error fetching article:', error);
        }
    }
    // جلب مقال بناءً على ID
    async getArticle() {
        const articleRef = ref(database, `articles`);
        try {
            const snapshot = await get(articleRef);
            if (snapshot.exists()) {
                return snapshot.val();
            } else {
                console.log('No article found');
            }
        } catch (error) {
            console.error('Error fetching article:', error);
        }
    }

    // حذف مقال
    async deleteArticle(id) {
        const articleRef = ref(database, `articles/article${id}`);
        try {
            await remove(articleRef);
            console.log('Article deleted successfully');
        } catch (error) {
            console.error('Error deleting article:', error);
        }
    }
}

export default ArticleDAO;
