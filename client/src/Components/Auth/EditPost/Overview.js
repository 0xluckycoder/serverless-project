import React from 'react';
import { Form, Formik, FieldArray, useField } from 'formik';
import {Link} from 'react-router-dom';
import * as Yup from 'yup';
// import { updateBranch, deleteBranch, createBranch, updatePost } from '../../../graphql/mutations';
// import { API, graphqlOperation } from 'aws-amplify';
import swal from 'sweetalert';

import style from './edit.module.scss';

// import Options from '../FormOptions/Options';

const Overview = ({ initialData, currentPost }) => {

    const { post } = initialData;
    const removeBranch = async (item) => {
      // console.log('removed', item.id);
      // const deletedBranch = await API.graphql(graphqlOperation(deleteBranch, {input : { id: item.id }}));
      // console.log(deletedBranch);
    }



    return (
        <div>
        {post &&
        <Formik
          initialValues={{
            category: post.category,
            brandName: post.brandName,
            number: post.number,
            website: post.website,
            facebook: post.facebook,
            instagram: post.instagram,
            twitter: post.twitter,
            branches: post.branches.map((branch) => {
              return {
                id: branch._id,
                branchLocation: branch.branchLocation,
                district: branch.district
              }
            }),
          }}
          validationSchema={Yup.object().shape({
            category: Yup.string().required(),
            brandName: Yup.string().min(2).max(25).required('Required'),
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
              .max(5, 'Maximum 5 branches'),

              // bookingOption: Yup.string().max(100).url(),
              // airbnbOption: Yup.string().max(100).url(),
              // trivagoOption: Yup.string().max(100).url(),
          })}
          onSubmit={(values) => {

            console.log(values);

            // console.log('submitted values', values);

            // const { 
            //   category, 
            //   brandName, 
            //   number,
            //   website, 
            //   facebook, 
            //   instagram, 
            //   twitter,
            // } = values;

              // collect options if available
              // let availableOptions = [];
              // airbnbOption && availableOptions.push({ option: "airbnb", url: airbnbOption });
              // bookingOption && availableOptions.push({ option: "booking", url: bookingOption });
              // trivagoOption && availableOptions.push({ option: "trivago", url: trivagoOption });
              // halalOption && availableOptions.push({ option: "halal", url: halalOption });

            // // structure the posts properly
            // const post = {
            //   id: currentPost,
            //   brand_name: brandName,
            //   category: category,
            //   number: number,
            //   website: website,
            //   facebook: facebook,
            //   instagram: instagram,
            //   twitter: twitter
            // };

            const handleUpdateBranch = async (update) => {
              // try {
              //   const updatedBranch = await API.graphql(graphqlOperation(updateBranch, { input: update }));
              //   console.log('branch updated', updatedBranch);
              // } catch (error) {
              //   console.log('update branch error', error);
              // }
            }

            const handleCreateBranch = async (create) => {
              // try {
              //   const createdBranch = await API.graphql(graphqlOperation(createBranch, { input: create }));
              //   console.log('branch created', createdBranch);
              // } catch (error) {
              //   console.log('create branch error', error);

              // }
            }

            const handleUpdatePost = async () => {
              // try {
              //   const updatedPost = await API.graphql(graphqlOperation(updatePost, { input: post } ));
              //   console.log('updated post', updatedPost);
              //   swal({
              //     title: "Updated",
              //     text: "Overview is updated",
              //     buttons: false,
              //     timer: 2500
              //   });
              // } catch (error) {
              //   console.log('error updating post', error);
              // }
            }

            // updating branches 
            // for (const item of values.branches) {
            //   if (item.id) {
            //     const update = {
            //       id: item.id,
            //       postID: currentPost,
            //       location: item.branchLocation,
            //       district: item.district
            //     }
            //     handleUpdateBranch(update);
            //   } else {
            //     const create = {
            //       postID: currentPost,
            //       location: item.branchLocation,
            //       district: item.district
            //     }
            //     handleCreateBranch(create);
            //   }
            //   // add the id of the branch that i want to edit
            // }

            // updating post
            // handleUpdatePost();
            
          }}
        >
          {({ values, errors }) => (
            <Form>
              <div className={style.overview}>
                <div className={style.groupWrapper}>
                  <h1>Ad Information</h1>
                  <div className={style.formGroup}>
                    <CategoryField
                      label="Category"
                      type="text"
                      name="category"
                    />
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

                {/* <Options values={values} /> */}
    
                <div className={style.branchGroupWrapper}>
                  <h1>Branches</h1>
                  <p>You should at least have one branch. you can add up to 3</p>
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
                                <DistrictField
                                  label="District"
                                  type="text"
                                  name={`branches.${index}.district`}
                                />
                                {values.branches.length !== 1 && (
                                  <div className={style.addButton}>
                                    <button
                                      type="button"
                                      onClick={() => {
                                        removeBranch(friend)
                                        remove(index)
                                      }}
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
                  <button type="submit">Update Overview</button>
                  <Link to="/account"><button>Cancel</button></Link>
                </div>
              </div>
            </Form>
          )}
        </Formik>
        }
      </div>
    )
}

// const Options = () => {
// }

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

const DistrictField = ({ label, ...props }) => {
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

const CategoryField = ({ label, ...props }) => {
    const [field] = useField(props);

    return (
        <div>
        <label>{label}</label>
        <select {...field} {...props} className="form-control">
            <option value="fashion">Fashion</option>
            <option value="restaurantsCafes">Restaurants & Cafes</option>
            <option value="spasSaloons">Spas & Saloons</option>
            <option value="fitness">Fitness</option>
            <option value="homemade">Homemade</option>
            <option value="services">Services</option>
            <option value="taxi">Taxi</option>
            <option value="entertainment">Entertainment</option>
            <option value="onlineStores">Online stores</option>
            <option value="finance">Finance</option>
            <option value="hospitals">Hospitals</option>
            <option value="essentials">Essentials</option>
            <option value="tours">Tours</option>
            <option value="hotels">Hotels</option>
            <option value="shoppingCentres">Shopping Centres</option>
            <option value="wineStores">Wine Stores</option>
            <option value="properties">Properties</option>
            <option value="furniture">Furniture</option>
            <option value="events">Events</option>
            <option value="florists">Florists</option>
            <option value="freelancers">Freelancers</option>
            <option value="electronics">Electronics</option>
            <option value="advertising">Advertising</option>
            <option value="toysFun">Toys & Fun</option>
            <option value="vehicles">Vehicles</option>
            <option value="hardware">Hardware</option>
            <option value="sports">Sports</option>
          </select>
        </div>
    );
}

export default Overview;