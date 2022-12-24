import React from 'react'

export default function CheckoutWizard({ activeStep = 0 }) {
    // var activeStep = 0;
    // activeStep = props.activeStep;
    return (
        <div className='mb-5 flex flex-wrap'>
            {
                ['User Login', 'Shipping Address', 'Payment Method', 'Place Order'].map((step, index) => (
                    <div key={step} className={`flex-1 border-b-2 text-center ${index <= activeStep
                        ? 'border-sky-500 text-sky-500 pb-2'
                        : 'border-gray-400 text-gray-400 pb-2 '
                        }
                            `}>
                        {step}
                    </div>
                ))
            }
        </div >

    )
}
