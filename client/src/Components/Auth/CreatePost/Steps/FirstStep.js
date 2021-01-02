import React from 'react';
import { Link } from 'react-router-dom';
import style from './FirstStep.module.scss';
import { Field, useField, Formik, Form } from 'formik';
import * as Yup from 'yup';

export default function FirstStep({ setFirstValues, setStep }) {
  return (
    <div className={style.wrapper}>
      <div className={style.heading}>
        <h1>Select Related Category</h1>
      </div>

      <Formik
        initialValues={{
          category: '',
        }}
        validationSchema={Yup.object().shape({
          category: Yup.string().required('select a category before continue'),
        })}
        onSubmit={(values) => {
          // console.log(values);
          setFirstValues(values);
          setStep(2);
        }}
      >
        {({ values, errors }) => (
          <>
            {errors.category && (
              <div className="alert alert-danger" role="alert">
                {errors.category}
              </div>
            )}

            <Form>
              <div className={style.content}>
                <CategoryCard
                  icon={<i className="fas fa-tshirt"></i>}
                  category="Fashion"
                  categoryValue="fashion"
                />
                <CategoryCard
                  icon={<i className="fas fa-utensils"></i>}
                  category="Restaurants & Cafes"
                  categoryValue="restaurantsCafes"
                />
                <CategoryCard
                  icon={<i className="fas fa-cut"></i>}
                  category="Spas & Saloons"
                  categoryValue="spasSaloons"
                />
                <CategoryCard
                  icon={<i className="fas fa-dumbbell"></i>}
                  category="Fitness"
                  categoryValue="fitness"
                />
                <CategoryCard
                  icon={<i className="fas fa-hand-paper"></i>}
                  category="Homemade"
                  categoryValue="homemade"
                />
                <CategoryCard
                  icon={<i className="fas fa-circle"></i>}
                  category="Services"
                  categoryValue="services"
                />
                <CategoryCard
                  icon={<i className="fas fa-taxi"></i>}
                  category="Taxi"
                  categoryValue="taxi"
                />
                <CategoryCard
                  icon={<i className="fas fa-compact-disc"></i>}
                  category="Entertainment"
                  categoryValue="entertainment"
                />
                <CategoryCard
                  icon={<i className="fas fa-shopping-cart"></i>}
                  category="Online stores"
                  categoryValue="onlineStores"
                />
                <CategoryCard
                  icon={<i className="fas fa-hand-holding-usd"></i>}
                  category="Finance"
                  categoryValue="finance"
                />
                <CategoryCard
                  icon={<i className="fas fa-stethoscope"></i>}
                  category="Hospitals"
                  categoryValue="hospitals"
                />
                <CategoryCard
                  icon={<i className="fas fa-circle"></i>}
                  category="Essentials"
                  categoryValue="essentials"
                />
                <CategoryCard
                  icon={<i className="fas fa-plane"></i>}
                  category="Tours"
                  categoryValue="tours"
                />
                <CategoryCard
                  icon={<i className="fas fa-hotel"></i>}
                  category="Hotels"
                  categoryValue="hotels"
                />
                <CategoryCard
                  icon={<i className="fas fa-store"></i>}
                  category="Shopping Centres"
                  categoryValue="shoppingCentres"
                />
                <CategoryCard
                  icon={<i className="fas fa-wine-bottle"></i>}
                  category="Wine Stores"
                  categoryValue="wineStores"
                />
                <CategoryCard
                  icon={<i className="fas fa-home"></i>}
                  category="Properties"
                  categoryValue="properties"
                />
                <CategoryCard
                  icon={<i className="fas fa-couch"></i>}
                  category="Furniture"
                  categoryValue="furniture"
                />
                <CategoryCard
                  icon={<i className="far fa-calendar-alt"></i>}
                  category="Events"
                  categoryValue="events"
                />
                <CategoryCard
                  icon={<i className="fas fa-circle"></i>}
                  category="Florists"
                  categoryValue="florists"
                />
                <CategoryCard
                  icon={<i className="fas fa-briefcase"></i>}
                  category="Freelancers"
                  categoryValue="freelancers"
                />
                <CategoryCard
                  icon={<i className="fas fa-cog"></i>}
                  category="Electronics"
                  categoryValue="electronics"
                />
                <CategoryCard
                  icon={<i className="fas fa-ad"></i>}
                  category="Advertising"
                  categoryValue="advertising"
                />
                <CategoryCard
                  icon={<i className="fas fa-baby"></i>}
                  category="Toys & Fun"
                  categoryValue="toysFun"
                />
                <CategoryCard
                  icon={<i className="fas fa-car"></i>}
                  category="Vehicles"
                  categoryValue="vehicles"
                />
                <CategoryCard
                  icon={<i className="fas fa-tools"></i>}
                  category="Hardware"
                  categoryValue="hardware"
                />
                <CategoryCard
                  icon={<i className="fas fa-futbol"></i>}
                  category="Sports"
                  categoryValue="sports"
                />
              </div>
              <div className={style.formFooterButtons}>
                <button type="submit">Continue</button>
                <Link to="/account"><button>Cancel</button></Link>
              </div>
            </Form>
          </>
        )}
      </Formik>
    </div>
  );
}

function CategoryCard({ icon, category, categoryValue }) {
  const [field] = useField('category');

  const { value } = field;
  return (
    <div
      className={`${style.card} ${value === categoryValue && style.selected}`}
    >
      <Field
        type="radio"
        name="category"
        value={categoryValue && categoryValue}
      />
      {icon}
      <p>{category}</p>
    </div>
  );
}