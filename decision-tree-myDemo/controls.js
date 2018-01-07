function init() {

    // Training set
    var data =
        [{person: 'Homer', hairLength: 0, weight: 113, age: 36, gender: 'male'},
            {person: 'Marge', hairLength: 18, weight: 68, age: 34, gender: 'female'},
            {person: 'Bart', hairLength: 4, weight: 40, age: 10, gender: 'male'},
            {person: 'Lisa', hairLength: 10, weight: 35, age: 8, gender: 'female'},
            {person: 'Maggie', hairLength: 7, weight: 38, age: 1, gender: 'female'},
            {person: 'Abe', hairLength: 2, weight: 77, age: 70, gender: 'male'},
            {person: 'Selma', hairLength: 14, weight: 72, age: 41, gender: 'female'},
            {person: 'Otto', hairLength: 18, weight: 81, age: 38, gender: 'male'},
            {person: 'Krusty', hairLength: 10, weight: 90, age: 45, gender: 'male'}];

    // Configuration
    var config = {
        trainingSet: data,
        categoryAttr: 'gender',
        ignoredAttributes: ['person']
    };

    // Building Decision Tree
    var decisionTree = new decisionTreeClass.DecisionTree(config);

    // Testing Decision Tree
    var comic = {person: 'Comic guy', hairLength: 14, weight: 131, age: 38};

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