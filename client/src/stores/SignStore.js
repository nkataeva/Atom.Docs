import { makeObservable, action, observable, runInAction } from "mobx";
import { SignService } from "../http/services/signService";
import userStore from "./UserStore";

class Signs {
  mySign = [];
  forSigning = [];
  currentSign = null;
  createdNewSign = false;
  signing = false;
  loading = false;

  constructor() {
    makeObservable(this, {
      mySign: observable,
      forSigning: observable,
      currentSign: observable,
      createdNewSign: observable,
      signing: observable,
      fetchSign: action,
      createSign: action,
      fetchMySign: action,
      fetchForSigning: action,
    });
  }

  async fetchSign(data) {
    try {
      await SignService.createNewSign(data);
      runInAction(() => {
        this.signing = true;
      });
    } catch (error) {
      console.log("Ошибка при подписании заявки:", error);
    }
  }

  fetchMySign = async () => {
    try {
      this.loading = true;
      const mySign = await SignService.requestCreatedSign(userStore.user?.id);
      runInAction(() => {
        this.mySign = mySign.docs;
        this.loading = false;
      });
    } catch (error) {
      console.log("Ошибка при получении созданных заявок:", error);
    }
  };

  async fetchForSigning() {
    try {
      this.loading = true;
      const forSigning = await SignService.requestSignForMe(userStore.user.id);
      runInAction(() => {
        this.forSigning = forSigning;
        this.loading = false;
      });
    } catch (error) {
      console.log("Ошибка при получении заявок на подписание:", error);
    }
  }

  createSign = async (newSign) => {
    try {
      await SignService.createNewSign(newSign);
      runInAction(() => {
        this.createdNewSign = true;
      });
    } catch (error) {
      console.error("Произошла ошибка при создании поста:", error);
    }
  };
}

const signsStore = new Signs();

export default signsStore;
