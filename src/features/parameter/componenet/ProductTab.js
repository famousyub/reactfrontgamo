import React  from "react";
import ProductTableRow from "./ProductTablerow";
export default class ProductsTab extends React.Component {
  
    renderTableRows(inventory){
      const categoryKeys = Object.keys(inventory.categories);
      const CKLength = categoryKeys.length;
      let listOfProducts = [];
      
      for(let i = 0; i<CKLength; i++){
        let category = categoryKeys[i];
        listOfProducts = listOfProducts.concat(inventory.categories[category]);
      }
      
      let LOPlength = listOfProducts.length;
      if( LOPlength == 0){
        return <div><p>no parameter found </p></div>
      } else {
        let rows = [
         <tr>
          <th>parameter  Name</th>
          <th>parameter number </th>
          <th>Category</th>
          <th>Image</th>
        </tr>
        ];
        
        for(let i = 0; i<LOPlength; i++){
          rows.push(<ProductTableRow product={listOfProducts[i]}/>);
        }
        
        return rows;
      }
    }
    
    render(){
      return(
        <div className='ProductsTab'>
          <h1>Available parameters List</h1>
          <p>Showing all available parameters :</p>
          <table className='productTable'>
            {this.renderTableRows(this.props.inventory)}
          </table>
        </div>
      );
    }
    
  }
  