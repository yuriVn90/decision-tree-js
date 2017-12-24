function init() {

    // Training set
    var data =
        [{person: 'Homer', hairLength: 0, weight: 250, age: 36, sex: 'male'},
            {person: 'Marge', hairLength: 10, weight: 150, age: 34, sex: 'female'},
            {person: 'Bart', hairLength: 2, weight: 90, age: 10, sex: 'male'},
            {person: 'Lisa', hairLength: 6, weight: 78, age: 8, sex: 'female'},
            {person: 'Maggie', hairLength: 4, weight: 20, age: 1, sex: 'female'},
            {person: 'Abe', hairLength: 1, weight: 170, age: 70, sex: 'male'},
            {person: 'Selma', hairLength: 8, weight: 160, age: 41, sex: 'female'},
            {person: 'Otto', hairLength: 10, weight: 180, age: 38, sex: 'male'},
            {person: 'Krusty', hairLength: 6, weight: 200, age: 45, sex: 'male'}];

    // Configuration
    var config = {
        trainingSet: data,
        categoryAttr: 'sex',
        ignoredAttributes: ['person']
    };

    // Building Decision Tree
    var decisionTree = new dt.DecisionTree(config);

    // Testing Decision Tree
    var comic = {person: 'Comic guy', hairLength: 8, weight: 290, age: 38};

    var decisionTreePrediction = decisionTree.predict(comic);

    // Displaying predictions
    document.getElementById('testingItem').innerHTML = JSON.stringify(comic, null, 0);
    document.getElementById('decisionTreePrediction').innerHTML = JSON.stringify(decisionTreePrediction, null, 0);

    // Displaying Decision Tree
    document.getElementById('displayTree').innerHTML = treeToHtml(decisionTree.root);


    // Recursive (DFS) function for displaying inner structure of decision tree
    function treeToHtml(tree) {
        // only leafs containing category
        if (tree.category) {
            return ['<ul>',
                '<li>',
                '<a href="#">',
                '<b>', tree.category, '</b>',
                '</a>',
                '</li>',
                '</ul>'].join('');
        }

        return ['<ul>',
            '<li>',
            '<a href="#">',
            '<b>', tree.attribute, ' ', tree.predicateName, ' ', tree.pivot, ' ?</b>',
            '</a>',
            '<ul>',
            '<li>',
            '<a href="#">yes</a>',
            treeToHtml(tree.match),
            '</li>',
            '<li>',
            '<a href="#">no</a>',
            treeToHtml(tree.notMatch),
            '</li>',
            '</ul>',
            '</li>',
            '</ul>'].join('');
    }
}