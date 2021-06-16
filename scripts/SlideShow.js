class SlideShowHelper{
    SLIDER_SIZE = 4
    constructor(id){
        this.slider = [1,2,3,4]
        this.slider_id = id
    }

    get(){
        return this.slider
    }

    shift(n){
        for(var index=0; index < this.SLIDER_SIZE; index++){
            this.slider[index] += n
            if(this.slider[index] > 7)
                this.slider[index] = 1
            else if(this.slider[index] < 1)
                this.slider[index] = 7
        }
        this.show()
    }

    show(){
        var str = "slide_" + this.slider_id
        var slides = document.getElementsByClassName(str)
        for(var index = 0; index < slides.length; index++){
            slides[index].style.display = "none"
            slides[index].style.order = 0
        }
        for(var index = 0; index < this.SLIDER_SIZE; index++){
            
            slides[this.slider[index]-1].style.display = "block"
            slides[this.slider[index]-1].style.order = index
        }
    }
}