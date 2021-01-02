import React, { useState, useContext, useEffect } from 'react';
import logo from '../../../assets/logo.png';
import './CreatePost.scss';
import { createPost } from '../../../api/api';
import swal from 'sweetalert';

import FirstStep from './Steps/FirstStep';
import SecondStep from './Steps/SecondStep';
import ThirdStep from './Steps/ThirdStep';
import FourthStep from './Steps/FourthStep';

import { AuthContext } from '../../../Context/AuthContext';
import { useHistory } from 'react-router-dom';

export default function CreatePost() {
    const [step, setStep] = useState(1);
    const [firstValues, setFirstValues] = useState({});
    const [secondValues, setSecondValues] = useState({});
    const [thirdValues, setThirdValues] = useState({});
    const [loading, setLoading] = useState(false);

    const { state } = useContext(AuthContext);

    let history = useHistory();

    const submitData = async () => {
      const { category } = firstValues;
      
      const {
        brandName,
        number,
        website,
        facebook,
        instagram,
        twitter,
        branches  
      } = secondValues;

      const { thumbnail, slide } = thirdValues;

      const currentUser = state.user && state.user.user._id

      const values = {
        owner: currentUser,
        analytics: 1,
        brandName,
        category,
        number,
        website,
        facebook,
        instagram,
        twitter,
        thumbnail,
        slide,
        branches
      };

      // console.log(values);
      try {
        // console.log(values);
        setLoading(true);
        const data = await createPost(values);
        setLoading(false);
        console.log(data);
      } catch(error) {
        console.log(error);
        setLoading(false);
      }
    }

    const FormBody = ({ step }) => {
      // eslint-disable-next-line default-case
      switch (step) {
        case 1:
          return <FirstStep setStep={setStep} setFirstValues={setFirstValues} />;
        case 2:
          return (
            <SecondStep firstValues={firstValues} setStep={setStep} setSecondValues={setSecondValues} />
          );
  
        case 3:
          return (
            <ThirdStep
              setStep={setStep}
              setThirdValues={setThirdValues}
            />
          );
        case 4:
          return <FourthStep loading={loading} setLoading={setLoading} submitData={submitData} />;
      }
    }

    const Stepper = () => {
      return (
        <div className="step-wrapper">
          <Steps value={1}>Category</Steps>
          <Steps value={2}>Information</Steps>
          <Steps value={3}>Upload Media</Steps>
          <Steps value={4}>Submit</Steps>
        </div>
      );
    }

    const Steps = ({ children, value }) => {
      return (
        <div className="step">
          {value < step ? (
            <i className="fas fa-check-circle"></i>
          ) : value === step ? (
            <i className="fas fa-circle"></i>
          ) : (
            <i className="far fa-circle"></i>
          )}
  
          <h1>{children}</h1>
        </div>
      );
    }

    return (
      <div className="form-wrapper">
        <FormLeft>
          <img src={logo} alt="mangofriend" />
          <Stepper step={step} />
        </FormLeft>

        <FormRight>
          <FormBody step={step} />
        </FormRight>
    </div>
    )
}

function FormLeft({ children }) {
  return <div className="form-left">{children}</div>;
}

function FormRight({ children }) {
  return <div className="form-right">{children}</div>;
}
