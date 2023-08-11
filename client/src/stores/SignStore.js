import { makeObservable, action, observable} from "mobx";

class Signs {
    mySign = [];
    forSigning = [];
    currentSign = null;

    constructor() {
        makeObservable(this, {
            mySign: observable,
            forSigning: observable,
            currentSign: observable,
            fetchSign: action,
        })
    }

    async fetchSign(id) {
        try {
            const response = await fetch(`/api/sign/${id}`);
            if (response.ok) {
                const data = response.json();
                console.log(data);
                this.currentSign = data;
            } else {
                throw new Error(response.status)
            }
        } catch(error) {
            console.log('Ошибка при получении конкретной заявки:', error)
        }
    }

    async fetchMySign() {
        try {
            const response = await fetch(`/api/sign/my`);
            if (response.ok) {
                const data = response.json();
                console.log(data);
                this.mySign = data;
            } else {
                throw new Error(response.status)
            }
        } catch(error) {
            console.log('Ошибка при получении созданных заявок:', error)
        }
    }

    async fetchForSigning() {
        try {
            const response = await fetch(`/api/sign/for`);
            if (response.ok) {
                const data = response.json();
                console.log(data);
                this.forSigning = data;
            } else {
                throw new Error(response.status)
            }
        } catch(error) {
            console.log('Ошибка при получении заявок на подписание:', error)
        }
    }

    async createPost(newSign) {
        try {
          const response = await fetch('/api/sign/create', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(newSign),
          });
      
          if (!response.ok) {
            throw new Error(response.status);
          }
          return true;
        } catch (error) {
          console.error('Произошла ошибка при создании поста:', error);
        }
      }
}

export default Signs;