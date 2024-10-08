import AsyncStorage from "@react-native-async-storage/async-storage";

const useStorage = () => {
    // Buscar Itens
    const getItem = async (key) => {
        try {
            const passwords = await AsyncStorage.getItem(key);
            return JSON.parse(passwords) || [];
        } catch (e) {
            console.log("Error ao buscar", e);
            return [];
        }
    }

    // Salvar Item
    const saveItem = async (key, value) => {
        try {
            let passwords = await getItem(key);
            passwords.push(value);
            
            await AsyncStorage.setItem(key, JSON.stringify(passwords));

        } catch (e) {
            console.log("Error ao salvar", e);
        }
    }

    // Remover Item
    const removeItem = async (key, item) => {
        try {
            let passwords = await getItem(key);
            let myPasswords = passwords.filter((password) => {
                return (password !== item)
            })
            
            await AsyncStorage.setItem(key, JSON.stringify(myPasswords));
            return myPasswords
            
        } catch (e) {
            console.log("Error ao remover", e);
        }
    }

    return {
        getItem,
        saveItem,
        removeItem,
    }

}

export default useStorage;