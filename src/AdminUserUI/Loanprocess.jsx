import React from 'react'

const LoanTypes = [
  {id:1, Name:"Vehicle Loan"},
  {id:2, Name:"Business Loan"},
  {id:3, Name:"Property Loan"},
]
function Loanprocess() {
  return (
    <div className='p-25 px-30'>
      <div>
        {LoanTypes.map((id) =>(
          <button key={id}>{id.Name}</button>
        ))}
      </div>
    </div>
  )
}

export default Loanprocess