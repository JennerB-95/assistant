<template>
    <div>
        <div :class="{'text-danger': total<=0}">
            <strong>{{minutes}}</strong>
            <strong>:</strong>
            <strong>{{seconds}}</strong>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        time: {
            type: Number,
            default: 0
        }
    },
    data: function () {
        return {
            total: '',
            minutes: '--',
            seconds: '--',
            interval: 0
        }
    },
    mounted: function () {
        this.total = parseInt(this.time, 10)
        this.interval = setInterval(() => {
            this.tick()
        }, 1000)
    },
    methods: {
        str_pad_left: function (string, pad, length) {
            return (new Array(length+1).join(pad)+string).slice(-length)
        },
        tick: function () {
            var minutes = Math.floor(this.total / 60)
            var seconds = this.total - minutes * 60
            this.minutes = this.str_pad_left(minutes, '0', 2)
            this.seconds = this.str_pad_left(seconds, '0', 2)

            if (this.total <= 0) {
                clearInterval(this.interval)
                this.$bus.$emit('Timer/stop')
            }
            this.total -= 1
        }
    }
}
</script>