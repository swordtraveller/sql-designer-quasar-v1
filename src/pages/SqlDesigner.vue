<template>
    <div style="margin-left: 15vw; margin-right: 15vw; margin-top: 5vh">
        <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
            <q-input
                filled
                v-model="tableSchema.name"
                style="width: 62vw"
                label="Table Name"
                lazy-rules
                :rules="[
                    (val) =>
                        (val && val.length > 0) || 'Please type table name',
                ]"
            />
            <q-checkbox
                v-model="tableSchema.ifNotExists"
                label="IF NOT EXISTS"
            />
            <q-separator style="margin-bottom: 2vh; width: 62vw" />
            <div
                v-for="(value, index) in tableSchema.fieldsList"
                :key="index"
                class="q-gutter-lg"
                style="display: flex; justify-content: row"
            >
                <q-input
                    filled
                    v-model="tableSchema.fieldsList[index].name"
                    label="Field Name"
                    style="width: 15vw; margin-left: 2.5rem"
                    lazy-rules
                    :rules="[
                        (val) =>
                            (val && val.length > 0) || 'Please type field name',
                    ]"
                />
                <q-select
                    label="Field Type"
                    style="width: 15vw"
                    transition-show="jump-up"
                    transition-hide="jump-up"
                    filled
                    v-model="tableSchema.fieldsList[index].type"
                    :options="dataTypeKinds"
                />
                <q-input
                    filled
                    v-model="tableSchema.fieldsList[index].comment"
                    label="Comment"
                    style="width: 15vw"
                    lazy-rules
                />
                <div style="display: flex; justify-content: row">
                    <q-checkbox
                        v-model="tableSchema.fieldsList[index].notNullable"
                        label="Not Null"
                    />
                    <!-- <q-checkbox
                        v-model="tableSchema.fieldsList[index].incremental"
                        label="Incremental"
                    /> -->
                    <q-btn
                        outline
                        size="xs"
                        style="
                            height: 2rem;
                            width: 1rem;
                            margin-top: 1.25rem;
                            margin-left: 1rem;
                        "
                        color="primary"
                        icon="remove"
                        @click="removeField(index)"
                    />
                </div>
            </div>
            <q-btn outline color="primary" icon="add" @click="addField" />
            <q-separator style="width: 62vw" />
            <q-select
                label="Engine"
                transition-show="jump-up"
                transition-hide="jump-up"
                filled
                v-model="tableSchema.engine"
                :options="engineKinds"
                style="width: 15vw"
            />
            <q-select
                label="Default Charset"
                transition-show="jump-up"
                transition-hide="jump-up"
                filled
                v-model="tableSchema.charset"
                :options="charsetKinds"
                style="width: 15vw"
            />
            <div style="margin-bottom: 2vh">
                <q-btn
                    label="Submit"
                    icon="check"
                    type="submit"
                    color="primary"
                    style="width: 7vw"
                />
                <q-btn
                    label="Reset"
                    outline
                    icon="refresh"
                    type="reset"
                    color="primary"
                    class="q-ml-sm"
                    style="width: 7vw"
                />
            </div>
        </q-form>
        <q-input
            v-model="sqlStatement"
            filled
            type="textarea"
            :readonly="true"
            style="width: 62vw; margin-bottom: 2vh"
        />
        <q-btn
            label="Copy"
            icon="content_copy"
            type="submit"
            color="primary"
            @click="copy"
            style="width: 7vw"
        />
    </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import {
    dataTypeKinds,
    engineKinds,
    charsetKinds,
} from '../constants/database';

// #region variables
class Field {
    name = '';
    type = ref('');
    notNullable = true;
    // incremental = false;
    comment = '';
}
const tableSchema = reactive<{
    name: string;
    ifNotExists: boolean;
    fieldsList: Field[];
    engine: string;
    charset: string;
}>({
    name: '',
    ifNotExists: true,
    fieldsList: [new Field()],
    engine: '',
    charset: '',
});
const sqlStatement = ref('');
// #endregion

// #region functions
const addField = () => {
    tableSchema.fieldsList.push(new Field());
};

const removeField = (index: number) => {
    tableSchema.fieldsList.splice(index, 1);
};

const onSubmit = () => {
    let sqlStatementLineList: string[] = [];
    let firstLineList: string[] = ['CREATE TABLE'];
    if (tableSchema.ifNotExists === true) {
        firstLineList.push('IF NOT EXISTS');
    }
    firstLineList.push(`\`${tableSchema.name}\``);
    firstLineList.push('(');
    sqlStatementLineList.push(firstLineList.join(' '));
    tableSchema.fieldsList.forEach((field, index) => {
        let fieldLineList: string[] = [
            '\t',
            `\`${field.name}\``,
            field.type.value,
        ];
        if (field.notNullable === true) {
            fieldLineList.push('NOT NULL');
        }
        // if (field.incremental === true) {
        //     fieldLineList.push('AUTO_INCREMENT');
        // }
        if (field.comment != '') {
            fieldLineList.push('COMMENT');
            fieldLineList.push(`'${field.comment}'`);
        }
        if (index != tableSchema.fieldsList.length - 1) {
            fieldLineList.push(',');
        }
        let fieldLine: string = fieldLineList.join(' ');
        sqlStatementLineList.push(fieldLine);
    });
    let lastLineList: string[] = [
        ')',
        `ENGINE=${tableSchema.engine.value}`,
        `DEFAULT CHARSET=${tableSchema.charset.value};`,
    ];
    let lastLine: string = lastLineList.join(' ');
    sqlStatementLineList.push(lastLine);
    sqlStatement.value = sqlStatementLineList.join('\n');
};

const onReset = () => {
    tableSchema.name = '';
    tableSchema.ifNotExists = true;
    tableSchema.fieldsList.length = 0;
    tableSchema.fieldsList.push(new Field());
    tableSchema.engine = '';
    tableSchema.charset = '';
    sqlStatement.value = '';
};

const copy = () => {
    navigator.clipboard
        .writeText(sqlStatement.value)
        .then(() => {
            console.log('Text copied to clipboard');
        })
        .catch((err) => {
            console.error('Error in copying text: ', err);
        });
};
// #endregion
</script>
