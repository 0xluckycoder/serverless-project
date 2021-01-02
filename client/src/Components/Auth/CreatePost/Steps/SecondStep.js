import React from 'react';
import {Link} from 'react-router-dom';
import { useField, FieldArray, Formik, Form } from 'formik';
import style from './SecondStep.module.scss';
import * as Yup from 'yup';

export default function SecondStep({ firstValues, setSecondValues, setStep }) {

    return (
      <div className={style.wrapper}>
        <Formik
          initialValues={{
            brandName: '',
            number: '',
            website: '',
            facebook: '',
            instagram: '',
            twitter: '',
            branches: [
              {
                branchLocation: '',
                district: '',
              },
            ],
            halalOption: false
          }}
          validationSchema={Yup.object().shape({
            brandName: Yup.string().min(2).max(15).required('Required'),
            number: Yup.string().min(2).max(12).required('Required'),
            website: Yup.string()
              .max(30)
              .url('must be like https://www.site.com'),
            facebook: Yup.string().max(50).url(),
            instagram: Yup.string().max(50).url(),
            twitter: Yup.string().max(50).url(),
            branches: Yup.array()
              .of(
                Yup.object().shape({
                  branchLocation: Yup.string()
                    .max(60)
                    .url('invalid url')
                    .required('required'),
                  district: Yup.string().required('required'),
                })
              )
              .required('required :)')
              .max(5, 'Maximum 5 branches')
          })}
          onSubmit={(values) => {
            // console.log(values);
            setSecondValues(values);
            setStep(3);
          }}
        >
          {({ values, errors }) => (
            <Form>
              <div className={style.groupWrapper}>
                <h1>Ad Information</h1>
                <div className={style.formGroup}>
                  <TextField
                    id="brandName"
                    name="brandName"
                    type="text"
                    label="Brand Name"
                  />
                  <TextField
                    id="number"
                    name="number"
                    type="number"
                    label="Phone Number"
                  />
                  <TextField
                    id="website"
                    name="website"
                    type="text"
                    label="Website"
                    placeholder="https://www.website.com"
                  />
                </div>
              </div>
  
              <div className={style.groupWrapper}>
                <h1>Connect social media</h1>
                <div className={style.formGroup}>
                  <TextField
                    id="facebook"
                    name="facebook"
                    type="text"
                    label="Facebook"
                    placeholder="https://www.facebook.com/account"
                  />
                  <TextField
                    id="instagram"
                    name="instagram"
                    type="text"
                    label="Instagram"
                    placeholder="https://www.instagram.com/account"
                  />
                  <TextField
                    id="twitter"
                    name="twitter"
                    type="text"
                    label="Twitter"
                    placeholder="https://www.twitter.com/account"
                  />
                </div>
              </div>
  
              {/* <Options values={firstValues} /> */}
  
              {/* <div className={style.options}>
                <h1>Restaurant Options</h1>
              </div> */}
  
              <div className={style.branchGroupWrapper}>
                <h1>Branches</h1>
                <p>You should at least have one branch. you can add up to 5</p>
                <FieldArray
                  name="branches"
                  render={({ remove, push }) => (
                    <div>
                      {values.branches && values.branches.length > 0
                        ? values.branches.map((friend, index) => (
                            <div key={index} className={style.branchInput}>
                              <TextField
                                label="Location"
                                type="text"
                                name={`branches.${index}.branchLocation`}
                              />
                              <SelectField
                                label="District"
                                type="text"
                                name={`branches.${index}.district`}
                              />
                              {values.branches.length !== 1 && (
                                <div className={style.addButton}>
                                  <button
                                    type="button"
                                    onClick={() => remove(index)}
                                  >
                                    <i className="fas fa-minus"></i>
                                  </button>
                                </div>
                              )}
                            </div>
                          ))
                        : null}
                      {values.branches.length !== 5 && (
                        <button
                          type="button"
                          onClick={() =>
                            push({
                              branchLocation: '',
                              district: '',
                            })
                          }
                        >
                          ADD
                        </button>
                      )}
                    </div>
                  )}
                />
              </div>
  
              <div className={style.formFooterButtons}>
                  <button type="submit">Continue</button>
                  <Link to="/account"><button>Cancel</button></Link>
                </div>
            </Form>
          )}
        </Formik>
      </div>
    );
  }
  
  
  const SelectField = ({ label, ...props }) => {
    const [field] = useField(props);
  
    return (
      <>
        <div>
          <label>{label}</label>
          <select {...field} {...props} className="form-control">
            <option>Select Field</option>
            <option value="ampara">Ampara</option>
            <option value="anuradhapura">Anuradhapura</option>
            <option value="badulla">Badulla</option>
            <option value="batticaloa">Batticaloa</option>
            <option value="colombo">Colombo</option>
            <option value="galle">Galle</option>
            <option value="gampaha">Gampaha</option>
            <option value="hambantota">Hambantota</option>
            <option value="jaffna">Jaffna</option>
            <option value="kalutara">Kalutara</option>
            <option value="kandy">Kandy</option>
            <option value="kegalle">Kegalle</option>
            <option value="kilinochchi">Kilinochchi</option>
            <option value="kurunegala">Kurunegala</option>
            <option value="mannar">Mannar</option>
            <option value="matale">Matale</option>
            <option value="matara">Matara</option>
            <option value="monaragala">Monaragala</option>
            <option value="mullativu">Mullativu</option>
            <option value="nuwaraEliya">Nuwara Eliya</option>
            <option value="polonnaruwa">Polonnaruwa</option>
            <option value="puttalam">Puttalam</option>
            <option value="ratnapura">Ratnapura</option>
            <option value="trincomalee">Trincomalee</option>
            <option value="vavuniya">Vavuniya</option>
          </select>
        </div>
      </>
    );
  };
  
  const TextField = ({ label, id, ...props }) => {
    const [field, meta] = useField(props);
  
    return (
      <div>
        <label>{label}</label>
        <input
          {...field}
          {...props}
          className={`form-control ${
            meta.touched && meta.error ? `is-invalid` : null
          }`}
        />
        {meta.touched && meta.error ? (
          <div id={id} className="invalid-feedback">
            {meta.error}
          </div>
        ) : null}
      </div>
    );
  };