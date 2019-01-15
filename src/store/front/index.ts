import { action, observable, runInAction } from 'mobx';
import { StoreExtends } from '@/utils/extends';

export class FrontStore extends StoreExtends {
  @observable
  frontConfig: FrontStore.IFrontConfig = {
    avatar: '',
    name: '',
    profile: '',
    description: '',
    cover: {
      home: '',
      blog: ''
    },
    defaultThumb: []
  };

  init() {
    this.getFrontConfig();
  }

  @action
  getFrontConfig = async () => {
    const res = await this.configApi$$.getFrontConfig();
    runInAction(() => {
      if (res.code === 0 && res.data) {
        res.data.defaultThumb = res.data.defaultThumb.map((i: any, idx: any) => ({
          uid: idx,
          name: i,
          url: i,
          key: idx
        }));
        this.frontConfig = res.data;
      }
    });
  };

  @action
  changeFrontConfig: FrontStore.IChangeFrontConfig = value => {
    const key = Object.keys(value)[0];
    this.frontConfig[key] = value[key];
  };

  @action
  updateFrontConfig: FrontStore.IUpdateFrontConfig = async () => {
    const res = await this.configApi$$.updateFrontConfig(this.frontConfig);
    runInAction(() => {
      if (res.code === 0) {
        this.$message.success(res.msg);
      } else {
        this.$message.error(res.msg);
      }
    });
  };

  @action
  changeCover: FrontStore.IChangeCover = value => {
    const key = Object.keys(value)[0];
    this.frontConfig.cover[key] = value[key];
  };

  @action
  changeDefaultThumb: FrontStore.IChangeDefaultThumb = value => {
    console.log(value);
    this.frontConfig.defaultThumb = value;
  };
}

export default new FrontStore();
