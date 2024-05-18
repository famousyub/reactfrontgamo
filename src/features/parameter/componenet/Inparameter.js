import MyRouter from "./MyRoutes";
import Sidebar from "./Sidebar";
import React  from "react";


export default class InventoryManagementApp extends React.Component{
    constructor(){
      super();
      this.state = {
        activeTab: 1,
        inventory: {
          categories:{
            medicament:[],
            medecin:[
  {category: "appdata", name: "Blue app", price: "16.99", imageURL: "https://cdn.shopify.com/s/files/1/0797/0169/products/mockup-c6d64730_1024x1024.jpg"}],
            pants:[],
            accessories:[]
          }
        },
        newItemForm: {
          category: '',
          name: '',
          price: '',
          imageURL: ''
        }
      };
    }
    
    changeActiveTab(index){
      this.setState({activeTab: index});
    }
    
    changeNewItemForm(formData){
      this.setState({newItemForm: formData});
    }
    
    addNewProduct(product){
      
      this.setState({newItemForm: {category: '',name: '',price: '',imageURL: ''}});
      
      const decapitalize = (string) => {
        return string.charAt(0).toLowerCase() + string.slice(1);
      }
      
      product.category = decapitalize(product.category);
      let inventory = this.state.inventory;
      inventory.categories[product.category].push(product);
      
      this.setState({inventory:inventory});
    }
    
    render(){
      return(
        <div className='InventoryManagementApp'>
          <h2 className='header'><i className="icon-th-list"></i> Parameter </h2>
          <h1 className='title' onClick={() => this.changeActiveTab(1)}>Inventory</h1>
          <div className='app-body'>
            <Sidebar activeTab={this.state.activeTab} changeTab={this.changeActiveTab.bind(this)}/>
            <MyRouter 
              activeTab={this.state.activeTab} 
              inventory={this.state.inventory}
              newItemFormData={this.state.newItemForm}
              changeNewItemForm={this.changeNewItemForm.bind(this)}
              addNewProduct={this.addNewProduct.bind(this)}
              />
          </div>
        
        </div>
      );
    }
  }
  