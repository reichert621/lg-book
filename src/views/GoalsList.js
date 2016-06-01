// DEPRECATED?

// import React from 'react'
// import { connect } from 'react-redux'
// import { fetchGoals } from '../redux/modules/goals'

// const mapStateToProps = (state) => ({
//   goals: state.goals.items
// })

// export class GoalsList extends React.Component {
//   static propTypes = {
//     goals: React.PropTypes.array,
//     fetchGoals: React.PropTypes.func.isRequired
//   }

//   componentDidMount () {
//     this.props.fetchGoals()
//   }

//   render () {
//     let items

//     if (this.props.goals && this.props.goals.length) {
//       items = this.props.goals.map((item) => {
//         return (
//           <li key={item._id}>{item.text}</li>
//         )
//       })
//     } else {
//       items = <li>No goals!</li>
//     }

//     return (
//       <div>
//         <h1>Goals</h1>

//         <ul>
//           {items}
//         </ul>

//       </div>
//     )
//   }
// }

// export default connect(mapStateToProps, { fetchGoals })(GoalsList)
