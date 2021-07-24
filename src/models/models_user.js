const {orm} = require('../configs/db')
const {DataTypes, where, Op, Sequelize} = require("sequelize")
const users = {}

class User{
    constructor(){
        this.table = orm.define("users", {
            id:{
                type: DataTypes.INTEGER,
                allowNull:false,
                autoIncrement: true,
                primaryKey: true
            },
            name:{
                type: DataTypes.STRING,
                allowNull: false,
            },
            username:{
                type: DataTypes.STRING,
                allowNull: false,
            },
            password:{
                type: DataTypes.STRING,
                allowNull: false
            },
            role:{
                type: DataTypes.STRING,
                allowNull: false,
            },          
        },{
            timestamps: false
        }
        )
    }
    
    GetAll() {
        return new Promise((resolve, reject) => {
            this.table.findAll({
                order: [["id","DESC"]],
            })
            .then((res) => {
                const productJSON = res
                const dataProduct = productJSON.map((data) => {
                const object = {
                    id_users : data.id,
                    name_user : data.name,
                    username : data.username,
                    password : data.password,
                    role : data.role
                }
                return object;
            })
                resolve(dataProduct)
            }).catch((err) => {
                reject(err.message)
            });
        })
    }

    GetbyUsername(username) {
        return new Promise((resolve, reject) => {
            this.table.findAll({
                where : {
                    username:{
                        [Op.iLike] : `${username}`
                    }
                },
            })
            .then((res) => {
                const productJSON = res
                const dataProduct = productJSON.map((data) => {
                const object = {
                    id_users : data.id,
                    name_user : data.name,
                    username : data.username,
                    password : data.password,
                    role : data.role
                }
                return object;
            })
                resolve(dataProduct)
            }).catch((err) => {
                reject(err.message)
            });
        })
    }

    AddData(data) {
        return new Promise((resolve, reject) => {
            this.table.create(data)
            .then((res) => {
                resolve('Add users success')
            }).catch((err) => {
                reject(err.message)
            });
        })
    }

    UpdateDate(data) {
        return new Promise((resolve, reject) => {
            this.table.update({
                name : data.name,
                password : data.password,
                role: data.role
            },{
                where : {
                    username : data.username
                }
            })
            
            .then((res) => {
                resolve('Update users success')
            }).catch((err) => {
                reject(err.message)
            });
        })
    }

    DeleteData(id_del){
        return new Promise((resolve, reject) => {
            this.table.destroy({
                where: {
                    id : id_del
                }
            }).catch((err) => {
                reject(err.message)
            });
        })
    }  
}

module.exports = new User()