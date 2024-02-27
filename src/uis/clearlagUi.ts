let form = new MessageFormData()
form.title("Clearlag Settings");
let effectList = [ "item", "all entitys" ]
form.dropdown("Clear type",clearList)
form.slider("minutes", 5, 10, 15, 20, 25, 30)
form.toggle("enabled", true)