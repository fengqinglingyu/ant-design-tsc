import React from 'react';
import { Table, Divider } from 'antd';
import { ColumnProps } from 'antd/lib/table';
import { IPersonBase } from 'src/interfaces';

interface IProps {
  list: IPersonBase[];
  onClickId: (id: number) => void;
}

interface IState {
  columnsSetting?: Array<ColumnProps<IPersonBase>>;
  list: IPersonBase[];
}

const getColumnsSetting = (props: IProps): Array<ColumnProps<IPersonBase>> => [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (text: string, record: { id: number }) => (
      // tslint:disable-next-line:jsx-no-lambda
      <a href="javascript:;" onClick={() => props.onClickId(record.id)}>
        {text}
      </a>
    )
  },
  {
    title: 'Gender',
    dataIndex: 'gender',
    key: 'gender',
    render: (text: number) => (text === 0 ? 'male' : 'female')
  },
  {
    title: 'Action',
    key: 'action',
    render: (text: any, record: { name: string }) => (
      <span>
        <a href="javascript:;">Invite {record.name}</a>
        <Divider type="vertical" />
        <a href="javascript:;">Delete</a>
      </span>
    )
  }
];

export default class List extends React.Component<IProps, IState> {
  public readonly state: IState = { list: [] };

  constructor(props: IProps) {
    super(props);
  }

  // public componentWillReceiveProps(nextProps: IProps) {
  //   const { list } = nextProps;
  //   this.setState({ list });
  // }

  public shouldComponentUpdate(nextProps: IProps, nextState: IState): boolean {
    const { list } = nextProps;
    const { list: listInState } = this.state;
    // const list: IPersonBase[] = nextProps.list;
    // const listInState: IPersonBase[] = this.state.list;
    const listStr = JSON.stringify(list);
    const listInStateStr = JSON.stringify(listInState);
    if (listStr !== listInStateStr) {
      this.setState({ list });
      return true;
    }
    return false;
  }

  public componentDidMount() {
    this.setState({ columnsSetting: getColumnsSetting(this.props) });
  }

  public render() {
    const { columnsSetting: columns, list } = this.state;
    return <Table columns={columns} dataSource={list} rowKey="id" />;
  }
}
