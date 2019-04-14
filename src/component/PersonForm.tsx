import React from 'react';
import { Form, Input, Button } from 'antd';
import { IPerson } from 'src/interfaces';
import { FormComponentProps } from 'antd/lib/form';

interface IState {
  formInfo?: IPerson;
}

// interface IProp {
//   formInfo: IPerson;
// }

interface IProp extends FormComponentProps {
  formInfo: IPerson;
  saveInfo: (formInfo: IPerson) => void;
}

const FormItem = Form.Item;

class PersonForm extends React.Component<IProp, IState> {
  // public handleSubmit = (e: SyntheticEvent) => {
  //   e.preventDefault();
  //   this.props.form.validateFields((err, values) => {
  //     if (!err) {
  //       console.log('Received values of form: ', values);
  //     }
  //   });
  // }
  // public handleSelectChange = (value) => {
  //   console.log(value);
  //   this.props.form.setFieldsValue({
  //     note: `Hi, ${value === 'male' ? 'man' : 'lady'}!`,
  //   });
  // }

  public readonly state: IState = {
    formInfo: undefined
  };

  // public constructor(props: IProp) {
  //   super(props);
  //   // this.setState({ formInfo: props.formInfo });
  // }

  public componentWillReceiveProps(nextProps: IProp): void {
    this.setState({ formInfo: nextProps.formInfo });
  }

  public componentDidMount(): void {
    this.setState({ formInfo: this.props.formInfo });
  }

  public save = (): void => {
    this.props.form.validateFields((err: any, values: any) => {
      if (!err) {
        const { formInfo } = this.state;
        const tmp: IPerson = { ...formInfo, ...values };
        console.log(tmp);
        this.props.saveInfo(tmp);
        // this.setState({ formInfo: tmp }, () => {
        //   console.log(this.state.formInfo);
        // });
      }
    });
  };

  public FormTmpl = (): JSX.Element => {
    const formInfo: IPerson = this.state.formInfo!;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      }
    };

    const { getFieldDecorator } = this.props.form;

    return (
      <Form {...formItemLayout} style={{ margin: '0 100px' }}>
        <FormItem label="First Name">
          {getFieldDecorator('first_name', {
            rules: [
              {
                required: true,
                message: 'Please input your first name!'
              }
            ],
            initialValue: formInfo.first_name
          })(<Input />)}
        </FormItem>
        <FormItem label="Last Name">
          {getFieldDecorator('last_name', {
            rules: [
              {
                required: true,
                message: 'Please input your last name!'
              }
            ],
            initialValue: formInfo.last_name
          })(<Input />)}
        </FormItem>
        <FormItem label="Gender">
          {getFieldDecorator('gender', { initialValue: formInfo.gender })(
            <Input />
          )}
        </FormItem>
        <FormItem label="Email">
          {getFieldDecorator('email', {
            rules: [
              {
                type: 'email',
                message: 'The input is not valid E-mail!'
              },
              {
                required: true,
                message: 'Please input your email!'
              }
            ],
            initialValue: formInfo.email
          })(<Input />)}
        </FormItem>
        <Button type="primary" onClick={this.save}>
          Save
        </Button>
      </Form>
    );
  };

  public render() {
    if (!this.state.formInfo) {
      return null;
    }
    return <this.FormTmpl />;
  }
}

// export default PersonForm;
export default Form.create<PersonForm>({})(PersonForm);
