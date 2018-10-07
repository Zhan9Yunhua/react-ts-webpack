import * as React from 'react';
import { Modal, Button, Input } from 'antd';
import styled from '@/styles';
import { Draggable } from '@/components/common';

interface IClassificationModalProps extends IClassName {
  visible: boolean;
  onClassificationModal: () => void;
  classification: DataStore.IClassNames[];
  sortClassification: DataStore.ISortClassification;
  getClassification: () => void;
  addClassification: DataStore.IAddClassification;
  updateClassification: DataStore.IUpdateClassification;
  removeClassification: DataStore.IRemoveClassification;
}

class ClassificationModal extends React.Component<IClassificationModalProps> {
  public state = {
    addClassName: '',
    isAddBtn: false
  };

  public onAddClassName = async () => {
    this.onBtnState(true);
    const res = await this.props.addClassification({ className: this.state.addClassName });
    this.onBtnState(false);
    if (res.code === 0) {
      this.setState({
        addClassName: ''
      });
    }
  };

  public onChangeAddClassName = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      addClassName: e.target.value
    });
  };

  public onBtnState = (state: boolean) => {
    this.setState({
      isAddBtn: state
    });
  };

  public onChangeSort = (value: DataStore.IClassNames[]) => {
    this.props.sortClassification(value);
  };

  public onEdit = async (newRow: DataStore.IClassNames, oldRow: DataStore.IClassNames) => {
    if (newRow.className !== oldRow.className) {
      await this.props.updateClassification(newRow);
    }
  };

  public onRemove = async (row: DataStore.IClassNames) => {
    await this.props.removeClassification(row);
  };

  public onSaveClassificationModal = async () => {
    await this.props.updateClassification();
  };

  public render() {
    return (
      <Modal
        visible={this.props.visible}
        onCancel={this.props.onClassificationModal}
        footer={[
          <Button key="ok" type="primary" onClick={this.onSaveClassificationModal}>
            ok
          </Button>,
          <Button key="no" onClick={this.props.onClassificationModal}>
            no
          </Button>
        ]}
        title="Classification"
        className={this.props.className}
      >
        <div>
          <div className="modal__inp">
            <Input
              value={this.state.addClassName}
              onChange={this.onChangeAddClassName}
              style={{ width: '200px', marginRight: '10px' }}
            />
            <Button onClick={this.onAddClassName} disabled={this.state.isAddBtn}>
              Add
            </Button>
          </div>

          <Draggable
            dataSource={this.props.classification}
            dataIndex="className"
            onChange={this.onChangeSort}
            onEdit={this.onEdit}
            onRemove={this.onRemove}
          />
        </div>
      </Modal>
    );
  }
}

export default styled(ClassificationModal)`
  .modal__inp {
    margin-bottom: 20px;
  }
`;
