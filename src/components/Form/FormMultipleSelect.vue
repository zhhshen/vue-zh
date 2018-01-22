<template lang="html">
<div class="multiple-select-wrap"
    :style="customStyle"
    ref="multipleSelect">
	<div class="multiple-select-title" @click.stop="toggleChild">
        <div class="multiple-select-result" v-if="selectedItems.length">
            <span v-for="(f, inx) in selectedItems" @click.stop="toFrom(f)">
		        <i class="ion-android-cancel multiple-select-icon_cancel"></i>
		        <em>{{ f.label }}</em>
		    </span>
	    </div>
        <span v-else>{{ hint }}</span>
	    <i class="ion-chevron-down multiple-select-icon"></i>
	</div>

	<div class="multiple-select-body"
        v-show="visible"
        :style="[customStyle, fixedStyle]">
        <div class="multiple-select-body-inner">
            <div class="multiple-select-search">
                <input type="text" :placeholder="placeholder" v-model="filterKey">
		    </div>
		    <div  class="multiple-select-content">
                <ul class="multiple-select-options" v-if="filterData.length">
			        <li :class="{ active: m._active }"
                        v-for="(m, inx) in filterData"
                        :key="m.value"
                        @click.stop="toEnd(m, inx)">
                        <div>{{ m.label }}</div>
                    </li>
		        </ul>

		        <ul class="multiple-select-options" v-else>
			        <li><div>没有匹配项</div></li>
		        </ul>
		    </div>
        </div>
	</div>
</div>
</template>

<script>
export default {
    name: 'form-multiple-select',

    data () {
        return {
            filterKey: '', // 搜索词
            visible: false,
            endItems: [],
            lastItem: 200,
            fixedStyle: {},
        }
    },

    props: {
        organization: {
            type: Array,
            default: () => []
        },

        hint: {
            type: String,
            default: '请选择'
        },

        placeholder: {
            type: String,
            default: '请输入搜索关键词'
        },

        value: {
            type: Array,
            default: () => []
        },

        customStyle: {
            type: Object,
            default: () => {}
        }
    },

    computed: {
        filterData () {
            let key = this.filterKey
            if (key) {
                return this.curOrganization.filter(item => {
                    return (
                        item.value.indexOf(key) !== -1 ||
                        item.label.indexOf(key) !== -1
                    )
                })
            } else {
                return this.curOrganization.slice(0)
            }
        },

        curOrganization () {
            let organization = this.organization || []
            return organization.map(g => {
                if(typeof g === 'object'){
                    return Object.assign({}, g, {
                        _active: this.inValue.indexOf(g.value) !== -1
                    })
                } else {
                    return g
                }
            })
        },

        inValue () {
            return this.value || []
        },

        selectedItems () {
            let curOrganization = this.curOrganization
            let result = []
            for (let i = 0; i < curOrganization.length; i++) {
                const { value, label } = curOrganization[i];
                if (this.inValue.indexOf(value) !== -1) {
                    result.push({ value, label })
                }
            }
            return result
        }
    },

    watch: {
        inValue (curr) {
            if (Array.isArray(curr)) {
                this.$emit('input', curr, this.selectedItems)
            }
        }
    },

    created () {
    },

    mounted () {},

    methods: {
        toggleChild () {
            this.visible ? this.hide() : this.show()
        },

        show () {
            this.visible = true
            document.addEventListener('click', this.closeOnDocumentClick, false)
        },

        hide () {
            this.visible = false
            document.removeEventListener(
                'click',
                this.closeOnDocumentClick,
                false
            )
        },

        closeOnDocumentClick (e) {
            if (!this.$el.contains(e.target)) {
                this.hide()
            }
        },

        // 撤销选择
        toFrom (f) {
            let inx = this.inValue.indexOf(f.value)
            this.inValue.splice(inx, 1)
        },

        // 选中
        toEnd (m) {
            let inx = this.inValue.indexOf(m.value)
            if (m._active) {
                if (inx !== -1) {
                    this.inValue.splice(inx, 1)
                }
            } else {
                if (inx === -1) {
                    this.inValue.push(m.value)
                }
            }
        }
    },

    beforeDestroy () {}
}
</script>

<style lang="less" scoped>
.multiple-select-wrap {
    position: relative;
    min-width: 200px;
    width: 200px;
}

.multiple-select-title {
    position: relative;
    width: 100%;
    min-height: 38px;
    line-height: 28px;
    padding: 5px 10px;
    border-bottom: 1px solid rgba(81, 130, 228, 0.5);
}

.multiple-select-icon {
    position: absolute;
    display: inline-block;
    top: 50%;
    right: 0px;
    font-size: 10px;
    color: #999;
    transform: translate(0, -50%);
    &_cancel {
        font-size: 20px;
        color: #666;
    }
}

.multiple-select-result {
    span {
        display: inline-flex;
        align-items: center;
        justify-content: space-between;
        background: #e0e0e0;
        position: relative;
        margin: 0 8px 8px 0;
        padding: 2px 10px;
        color: rgba(0, 0, 0, 0.87);
        border-radius: 3px;
        white-space: normal;
        text-overflow: ellipsis;
        overflow: hidden;
        font-size: 12px;
        text-align: center;
        cursor: pointer;
        em {
            display: flex;
            align-items: center;
            font-style: normal;
            padding-left: 5px;
        }
    }
}

.multiple-select-body {
    position: relative;
    top: 0;
    left: 0px;
    z-index: 100;
    min-width: 200px;
    height: 0.1px;
}

.multiple-select-body-inner {
    position: absolute;
    top: 0;
    left: 0px;
    z-index: 100;
    min-width: 200px;
    width: 100%;
    height: auto;
    min-height: 100px;
    background: #fff;
    border-radius: 3px;
    box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.1), 0 0 12px 5px rgba(0, 0, 0, 0.1);
}

.multiple-select-search {
    padding: 10px;
    input {
        width: 100%;
        height: 34px;
        padding: 5px;
        border: none;
        border-bottom: 1px solid rgba(81, 130, 228, 0.5);
        outline: none;
    }
}

.multiple-select-options {
    list-style: none;
    overflow-y: auto;
    overflow-x: hidden;
    max-height: 160px;
    li {
        padding: 10px;
        cursor: pointer;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        color: rgba(10, 18, 32, 0.64);
        &:hover {
            color: rgba(10, 18, 32, 0.87);
            background-color: rgba(232, 235, 237, 0.6);
        }
        &.active {
            color: rgba(81, 130, 228, 1);
        }
    }
    &-meta {
        input {
            margin-right: 10px;
        }
        span {
            cursor: pointer;
        }
        label {
            margin-right: 10px;
            cursor: pointer;
            font-weight: 400;
        }
    }
}
</style>
