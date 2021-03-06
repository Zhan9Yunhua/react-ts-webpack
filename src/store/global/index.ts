import { observable, action, runInAction } from 'mobx';
import { StoreExtends } from '@/utils/extends';

export class GlobalStore extends StoreExtends {
  @observable
  config: GlobalStore.IConfig = {
    logo: '',
    primaryColor: '#1da57a',
    drawerColor: '#5ee2b9',
    title: `Welcome, Zyhua's Admin`,
    drawerWidth: 30
  };

  @observable
  isSpin: boolean = false;

  @observable
  editorLanguages: string[] = ['markdown', 'typescript', 'javascript', 'go'];

  @observable
  isCollapsed: boolean = false;

  @observable
  display: string = '';

  @observable
  isInitLoading: boolean = true;

  constructor() {
    super();
    this.init();
  }

  init() {
    this.getConfig();
  }

  @action
  hideInitLoading = () => {
    this.isInitLoading = false;
  };

  @action
  getConfig = async () => {
    const res = await this.configApi$$.getAdminConfig();
    runInAction(() => {
      if (res.code === 0 && res.data) {
        this.config = res.data;
        window.less.modifyVars({
          '@primary-color': res.data.primaryColor || '#1da57a'
        });

        this.hideInitLoading();
      }
    });
  };

  // 右菜单 缩放
  @action
  onCollapsed = () => {
    this.isCollapsed = !this.isCollapsed;
  };

  // 上传模块 on/off
  @action
  changeDisplay: GlobalStore.IChangeDisplay = value => {
    if (value === this.display) {
      this.display = '';
    } else {
      this.display = value;
    }
  };

  // 改变配置
  @action
  changeConfig: GlobalStore.IChangeConfig = value => {
    const key = Object.keys(value)[0];
    this.config[key] = value[key];
  };

  @action
  updateConfig = async () => {
    const res = await this.configApi$$.updateAdminConfig(this.config);
    runInAction(() => {
      if (res.code === 0) {
        this.$message.success(res.msg);
      }
    });
  };
}

export default new GlobalStore();
