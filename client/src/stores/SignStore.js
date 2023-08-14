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
      rejectSign: action,
      createSign: action,
      fetchMySign: action,
      fetchForSigning: action,
      getSign: action
    });
  }

  async fetchSign(data, id) {
    try {
      await SignService.sign(data, id);
      runInAction(() => {
        this.signing = true;
      });
    } catch (error) {
      console.log("Ошибка при подписании заявки:", error);
    }
  }

  async rejectSign(data, id) {
    try {
      await SignService.reject(data, id);
      runInAction(() => {
        this.signing = true;
      });
    } catch (error) {
      console.log("Ошибка при отклонении заявки:", error);
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

  fetchForSigning = async () => {
    try {
      this.loading = true;
      const forSigning = await SignService.requestSignForMe(userStore.user?.id);
      runInAction(() => {
        this.forSigning = forSigning.docs;
        this.loading = false;
      });
    } catch (error) {
      console.log("Ошибка при получении заявок на подписание:", error);
    }
  };

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

  getSign = async (id) => {
    try {
      const sign = await SignService.requestSignInfo(id);
      runInAction(() => {
        this.currentSign = sign;
      });
    } catch (error) {
      console.error("Произошла ошибка при получении инфо о заявке:", error);
    }
  }
}

const signsStore = new Signs();

export default signsStore;
