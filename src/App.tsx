import { Button } from 'antd';
import * as React from 'react';
import './App.scss';
import List from './component/List';
import PersonForm from './component/PersonForm';
import logo from './logo.svg';
import $req, { HttpMethod } from './utils/http-request';
import { IPersonBase, IPerson } from './interfaces';

interface IState {
  list: IPersonBase[];
  formInfo?: IPerson;
}

class App extends React.Component<any, IState> {
  public readonly state: IState = {
    list: [],
    formInfo: undefined
  };

  public getDetail = async (id: number) => {
    const url: string = `/get-detail?id=${id}`;
    try {
      const res: IPerson = await $req(url, { method: HttpMethod.get });
      this.setState({ formInfo: res });
    } catch (e) {
      console.error(e);
    }
  };

  public saveInfo = (formInfo: IPerson) => {
    if (formInfo.id) {
      this.updateInfo(formInfo);
    } else {
      this.create(formInfo);
    }
  };

  public async updateInfo(formInfo: IPerson) {
    const url = '/update';
    try {
      const res: IPerson = await $req(url, {
        method: HttpMethod.patch,
        body: formInfo
      });
      console.log(res);
    } catch (e) {
      console.error(e);
    }
  }

  public async create(formInfo: IPerson) {
    const url = '/create';
    console.log(url);
  }

  public getList = async () => {
    const url: string = '/get-person-list';
    try {
      const res: any = await $req(url, { method: HttpMethod.get });
      if (res.result.length) {
        const { result } = res;
        const list: IPersonBase[] = [];
        result.forEach((item: any) => {
          const obj: IPersonBase = {
            id: item.id,
            gender: item.gender,
            name: `${item.first_name} ${item.last_name}`
          };
          list.push(obj);
        });
        this.setState({ list });
      }
    } catch (e) {
      console.error(e);
    }
  };

  public render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.tsx</code> and save to reload.
        </p>
        {/* <Button onClick={this.getData}>Get Data</Button> */}
        <Button onClick={this.getList}>Get List</Button>
        <List list={this.state.list} onClickId={this.getDetail} />
        {this.state.formInfo ? (
          <PersonForm formInfo={this.state.formInfo} saveInfo={this.saveInfo} />
        ) : null}
      </div>
    );
  }
}

export default App;
