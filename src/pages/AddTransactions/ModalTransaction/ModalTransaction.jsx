import Datetime from 'react-datetime';
import { Formik, ErrorMessage, useFormik } from 'formik';
import 'react-datetime/css/react-datetime.css';

import CustomSelect from '../SelectTransaction/SelectTransaction';
import moment from 'moment';
import validationSchema from '../validationSchema.js';
import 'react-toastify/dist/ReactToastify.css';

import {
  TransactBackdrop,
  TransactBox,
  TransactForm,
  TransTitle,
  CheckBoxWrapper,
  CheckBox,
  CheckBoxLabel,
  Income,
  Expense,
  TransactHadleWrapper,
  TransactSumLabel,
  TransactSumInput,
  TransactDateInput,
  TransactComment,
  TransactBtnAdd,
  TransactBtnCncl,
  TransactContainer,
  TransSumDateCommonBox,
  // TransactCloseBtn,
} from './ModalTransaction.styled';
import { useDispatch } from 'react-redux';
import financeOperations from 'redux/finance/finance-operations';
import { toast } from 'react-toastify';

export default function AddTransaction({ errors, touched }) {
  const dispatch = useDispatch();
  const renderInput = props => (
    <TransactDateInput {...props}></TransactDateInput>
  );

  const today = moment().format('YYYY-MM-DD');

  const valid = current => current.isBefore(today);
  const formik = useFormik({
    initialValues: {
      type: true,
      category: '',
      amount: 0,
      date: today,
      comment: '',
      year: null,
      month: null,
    },
    validationSchema,
    onSubmit: async values => {
      if (!values.type) {
        values.category = 'Regular income';
      }
      if (!values.category) {
        toast.error('Please enter category');
        return;
      }
      console.log(values.date);
      const arrDate = values.date.split('-');
      values.year = Number(arrDate[0]);
      values.month = Number(arrDate[1]);
      values.amount = Number(values.amount);

      console.log(values);
      try {
        await dispatch(financeOperations.createTransactions(values));
        toast.success('Yeap! Transaction created');
      } catch (error) {
        toast.error(error.message);
      }
      values.amount = 0;
      values.comment = '';
    },
  });
  function formatDate(momentDate) {
    return moment(momentDate).format('YYYY-MM-DD');
  }
  return (
    <TransactBackdrop>
      <TransactContainer>
        {/* <TransactCloseBtn></TransactCloseBtn> */}
        <Formik>
          <TransactBox>
            <TransTitle>Add transaction</TransTitle>
            <TransactForm onSubmit={formik.handleSubmit}>
              <TransactHadleWrapper>
                <Income checked={formik.values.type}>Income</Income>
                <CheckBoxWrapper>
                  <CheckBox
                    defaultChecked
                    id="checkbox"
                    type="checkbox"
                    onChange={formik.handleChange}
                    name="type"
                    value={formik.values.type}
                  />
                  <CheckBoxLabel htmlFor="checkbox" />
                </CheckBoxWrapper>
                <Expense value={formik.values.type}>Expense</Expense>
              </TransactHadleWrapper>

              {formik.values.type && (
                <>
                  <CustomSelect
                    checked={formik.values.type}
                    value={formik.values.category}
                    onChange={value =>
                      formik.setFieldValue('category', value.value)
                    }
                  />
                  <ErrorMessage name="category" />
                </>
              )}

              <TransSumDateCommonBox>
                <TransactSumLabel htmlFor="amount"></TransactSumLabel>
                <div>
                  <TransactSumInput
                    id="amount"
                    name="amount"
                    value={formik.values.amount}
                    onChange={formik.handleChange}
                    placeholder="0.00"
                  ></TransactSumInput>
                  {/* <ErrorMessage name="sum" /> */}
                  {formik.errors.amount && formik.touched.amount ? (
                    <div>{formik.errors.amount}</div>
                  ) : null}
                </div>
                <Datetime
                  value={formik.values.date}
                  name="date"
                  onChange={dateFromValue =>
                    formik.setFieldValue('date', formatDate(dateFromValue))
                  }
                  renderInput={renderInput}
                  dateFormat="YYYY-MM-DD"
                  timeFormat={false}
                  isValidDate={valid}
                  closeOnSelect
                />
              </TransSumDateCommonBox>

              <TransactComment
                placeholder="Comment"
                value={formik.values.comment}
                name="comment"
                onChange={formik.handleChange}
              ></TransactComment>
              <TransactBtnAdd type="submit">Add</TransactBtnAdd>
            </TransactForm>
          </TransactBox>
        </Formik>
        <TransactBtnCncl>Cancel</TransactBtnCncl>
      </TransactContainer>
    </TransactBackdrop>
  );
}
// .split(".")
// .reverse()
// .join("-")
