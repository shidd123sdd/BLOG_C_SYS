<template>
  <div class="modalBox">
    <a-modal
      :visible="visible"
      title="添加标签"
      on-ok="handleOk"
      :closable="false"
      width="500px"
    >
      <template slot="footer">
        <a-button key="back" @click="handleCancel">
          返回
        </a-button>
        <a-button
          key="submit"
          type="primary"
          :loading="loading"
          @click="handleSubmit"
        >
          提交
        </a-button>
      </template>
      <div class="labelModel">
        <a-form
          :form="form"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 16 }"
          @submit="handleSubmit"
        >
          <a-form-item label="标签名称">
            <a-input
              placeholder="请输入标签名称"
              v-decorator="[
                'labelName',
                {
                  initialValue: labelInfo ? labelInfo.labelName : null,
                  rules: [
                    {
                      required: true,
                      message: '请输入标签名称'
                    }
                  ]
                }
              ]"
            />
          </a-form-item>

          <a-form-item label="上级标签">
            <a-cascader
              :changeOnSelect="true"
              placeholder="选择上级标签"
              @change="onSelect"
              :options="options"
              v-decorator="[
                'parentLabelId',
                {
                  initialValue: selectedIds ? selectedIds : null,
                  rules: [
                    {
                      type: 'array',
                      required: false
                    }
                  ]
                }
              ]"
            />
          </a-form-item>

          <a-form-item label="有效期">
            <a-range-picker
              v-decorator="[
                'validityDate',
                {
                  initialValue: labelInfo
                    ? [
                        moment(labelInfo.startDate, 'YYYY-MM-DD'),
                        moment(labelInfo.endDate, 'YYYY-MM-DD')
                      ]
                    : null
                }
              ]"
            />
          </a-form-item>
          <a-form-item label="是否显示">
            <a-switch
              v-decorator="[
                'isShow',
                {
                  valuePropName: 'checked',
                  initialValue: labelInfo ? labelInfo.isShow : true
                }
              ]"
            />
          </a-form-item>

          <a-form-item label="描述">
            <a-input
              type="textarea"
              v-decorator="[
                'description',
                { initialValue: labelInfo ? labelInfo.description : null }
              ]"
            />
          </a-form-item>
        </a-form>
      </div>
    </a-modal>
  </div>
</template>

<script>
import moment from "moment";
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    labelInfo: {
      type: Object
    },
    selectedIds: {
      type: Array
    },
    isUpdate: {
      type: Boolean
    }
  },
  data() {
    this.form = this.$form.createForm(this);
    return {
      options: [],
      loading: false,
      rangeConfig: {
        rules: [
          { type: "array", required: true, message: "Please select time!" }
        ]
      },
      parentLabelName: undefined,
      level: undefined
    };
  },
  watch: {
    "$store.state.label.labelList": function(val) {
      this.options = val;
    }
  },
  methods: {
    handleCancel() {
      this.form.resetFields();
      this.$emit("closeModel");
    },
    moment,
    onSelect(value, selectedOptions) {
      if (typeof selectedOptions == "undefined") {
        debugger;
        this.parentLabelName = null;
      } else {
        const len = selectedOptions.length;
        this.level = len + 1;
        this.parentLabelName = selectedOptions[len - 1].label;
      }
    },
    handleSubmit() {
      const { form, $store, isUpdate } = this;
      form.validateFields((err, values) => {
        const parentLabelIds = values["parentLabelId"];
        const parentLabelId = parentLabelIds[parentLabelIds.length - 1];
        const parentName = this.parentLabelName;
        const validityDate = values["validityDate"];

        values = {
          ...values,
          parentLabelId: parentLabelId,
          parentLabelName: parentName,
          level: this.level,
          startDate: validityDate[0].format("YYYY-MM-DD"),
          endDate: validityDate[1].format("YYYY-MM-DD")
        };
        if (isUpdate) {
          let level = this.level;
          let parentLabelName = this.parentLabelName;
          if (typeof level == "undefined") {
            level = this.labelInfo.level;
            parentLabelName = this.labelInfo.parentLabelName;
          }
          values = {
            ...values,
            id: this.labelInfo.id,
            level: level,
            parentLabelName: parentLabelName
          };
        }

        console.log(values);

        if (!err) {
          if (isUpdate) {
            $store.dispatch({
              type: "label/updateLabel",
              labelEntity: values
            });
            this.$emit.isUpdate = false;
          } else {
            $store.dispatch({
              type: "label/addNewLabel",
              labelEntity: values
            });
          }

          this.$message.info("success!");
          this.$emit("closeModel");
          form.resetFields();
        }
      });
    }
  }
};
</script>

<style scoped lang="less"></style>
