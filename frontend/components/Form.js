import React, { useEffect, useState } from 'react'
import * as yup from 'yup'

// 👇 Here are the validation errors you will use with Yup.
const validationErrors = {
  fullNameTooShort: 'full name must be at least 3 characters',
  fullNameTooLong: 'full name must be at most 20 characters',
  sizeIncorrect: 'size must be S or M or L'
}

// 👇 Here you will create your schema.
const formSchema = yup.object().shape({
  fullName: yup
      .string()
      .trim()
      .min(3, validationErrors.fullNameTooShort)
      .max(20, validationErrors.fullNameTooLong),
  size: yup
      .string()
      .trim()
      .oneOf(['Small', 'Medium', 'Large'], validationErrors.sizeIncorrect),
})

// 👇 This array could help you construct your checkboxes using .map in the JSX.
const toppings = [
  { topping_id: '1', text: 'Pepperoni' },
  { topping_id: '2', text: 'Green Peppers' },
  { topping_id: '3', text: 'Pineapple' },
  { topping_id: '4', text: 'Mushrooms' },
  { topping_id: '5', text: 'Ham' },
]

export default function Form() {
  const [formValues, setFormValues] = useState({
    fullName: '',
    size: '',
    toppings: Object.fromEntries(toppings.map(topping => [topping.topping_id, false]))
  });
  const [formErrors, setFormErrors] = useState({})
  const [formValid, setFormValid] = useState(false)
  const [formSuccess, setFormSuccess] = useState()
  const [formFailure, setFormFailure] = useState()

  useEffect(() => {
    formSchema.validate(formValues)
      .then(() => {
        setFormValid(true);
        setFormErrors()
      })
      .catch(errors => {
        const newErrors = {}
          errors.inner.forEach(err => {
            newErrors[err.path] = err.message;
          })
          setFormValid(false);
          setFormErrors(newErrors)
        })
  }, [formValues])

  const handleSubmit = (evt => {
    evt.preventDefault()
    formSchema.validate(formValues)
    .then(() => {
      setFormSuccess(true);
      setFormFailure(false);
    })
    .catch(() => {
      setFormFailure(true);
      setFormSuccess(false);
    });
  })
  
  const handleChange = (toppingId) => {
  setFormValues({
    ...formValues, 
    toppings: { ...formValues.toppings, [toppingId]: !formValues.toppings[toppingId]}
  })
}

  return (
    <form onSubmit={handleSubmit}>
      <h2>Order Your Pizza</h2>
      {formSuccess && <div className='success'>Thank you for your order!</div>}
      {formFailure && <div className='failure'>Something went wrong</div>}

      <div className="input-group">
        <div>
          <label htmlFor="fullName">Full Name</label><br />
          <input placeholder="Type full name" id="fullName" type="text" value={formValues.fullName} 
          onChange={(evt) => setFormValues({...formValues, fullName: evt.target.value})}/>
        </div>
        {formErrors.fullName && <div className='error'>{formErrors.fullName}</div>}
      </div>

      <div className="input-group">
        <div>
          <label htmlFor="size">Size</label><br />
          <select id="size" value={formValues.size} 
          onChange={(evt) => setFormValues({...formValues, size: evt.target.value})}>
            <option value="">----Choose Size----</option>
            {/* Fill out the missing options */}
            <option value="Small">Small</option>
            <option value="Medium">Medium</option>
            <option value="Large">Large</option>
          </select>
        </div>
        {formErrors.size && <div className='error'>{formErrors.size}</div>}
      </div>

      <div className="input-group">
        {/* 👇 Maybe you could generate the checkboxes dynamically */}
        {toppings.map(topping => (
          <label key={topping.topping_id}>
          <input
            name={topping.topping_id}
            type="checkbox"
            checked={formValues.toppings[topping.topping_id] || false}
            onChange={() => handleChange(topping.topping_id)}
            />
          {topping.text}<br />
        </label>
        ))}
      </div>

      {/* 👇 Make sure the submit stays disabled until the form validates! */}
      <input disabled={!formValid} type="submit" />
    </form>
  )
}
