module.exports = {
    methods: {
        route,
        /**
         * Translate the given key.
         */
        __(key) {
            if (null == this.$page.props.language) {
                return key;
            }
            var translation = this.$page.props.language[key]
            
                ? this.$page.props.language[key]
                : key
            return translation;
        },
 
        /** 
        * Translate the given key with basic pluralization. 
        */
        /*__n(key, number, replace = {}) { 
            var options = key.split('|');   
 
            key = options[1]; 
            if(number == 1) { 
                key = options[0]; 
            }   
 
            return tt(key, replace); 
        },*/
    },
}